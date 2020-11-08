import EventsEmitter from "https://deno.land/std@0.76.0/node/events.ts";
import * as path from "https://deno.land/std@0.76.0/path/mod.ts";

export default class ffmpeg extends EventsEmitter {
    /**
    * @arg {string} ffmpegDir -- path to the ffmpeg.exe (can be full path)
    * @arg {string} input -- path to input (can be full path)
    */
    constructor(ffmpegDir, input) {
        super()
        this.Codecs = "-c:a copy";
        this.input = path.resolve(String(input)); // input file location, mag later worden gespecified
        this.ffmpegDir = path.resolve(String(ffmpegDir)); // mag ./dir/ffmpeg.exe zijn. mag later worden gespecified
    }
    /**
     * @arg {string} ffmpegDir -- path to the ffmpeg.exe (can be full path)
     */
    setFfmpegPath(ffmpegDir) {
        if (ffmpegDir) this.ffmpegDir = path.resolve(String(ffmpegDir));
        return this;
    }
    /**
     * @arg {string} input -- path to input (can be full path)
     */
    inputFile(input) {
        this.input = path.resolve(String(input));
        return this;
    }
    /**
     * @arg {string} output -- output path (can be full path)
     */
    save(output) {
        this.outputFile = path.resolve(output);
        this.#run()
        return this;
    }
    /**
     * @arg {number} bitrate 
     * @arg {boolean} cbr 
     */
    videoBitrate(bitrate, cbr = true) {
        this.br = bitrate;
        let bitR;
        let bitRateString = String(bitrate);
        switch (bitRateString.charAt(bitRateString.length-1).toLowerCase()) {
            case "mb/s":
            case "mbps":
            case "m":
                bitR = Number.parseInt(bitrate) * 1000000
                break;
            case "kb/s":
            case "kbps":
            case "k":
            default:
                bitR = Number.parseInt(bitrate) * 1000
                break;
        }
        this.bitrate = ['-maxrate', bitR * 2, '-minrate', bitR / 4,"-b:v", bitR, '-bufsize', bitR * 5];
        if (Boolean(cbr) == true) this.bitrate.push('-maxrate', bitR, '-minrate', bitR, '-bufsize', '3M')
        return this;
    }
    /**
     * @arg FilterArray -- array with every filter
     */
    addFilters(FilterArray) {
        this.filters = [];
        if (FilterArray) {
            FilterArray.forEach(obj => {
                switch (obj.filter) {
                    case "yadif":
                        this.filters.push(`yadif=${obj.options.mode}:${obj.options.parity}:${obj.options.deint}`)
                        break;
                    case "drawtext":
                        this.filters.push(`drawtext="fontfile='${path.resolve(obj.options.fontfile).split(":").join("\\\\:")}': fontcolor='${obj.options.fontcolor}': fontsize='${obj.options.fontsize}': x='${obj.options.x}': y='${obj.options.y}': shadowcolor='${obj.options.shadowcolor}': shadowx='${obj.options.shadowx}': shadowy='${obj.options.shadowy}': text='${obj.options.text}'`)
                        break; //usable to add more filters later
                }
            })
        }
        return this;
    }
    #errorCheck() {
        this.error = [];
        if (!this.br || Number.isNaN(Number.parseInt(this.br))) this.error.push("Bitrate is Not a Number")
        if (!this.input) this.error.push("No input specified!");
        if (!this.outputFile) this.error.push("No output specified!");
        if (!this.ffmpegDir) this.error.push("No ffmpeg directory specified!");
        if (this.filters.join("").includes("undefined")) this.error.push("Filters were selected, but the field is incorrect or empty");
        if (this.error.join("") !== "") this.emit('error', '\r\n' + this.error.join("\r\n"));
    }
    #formatting() {
        let temp = [this.ffmpegDir, "-y", "-i", this.input]; // Add required commands
        if (this.filters) temp.push("-vf", this.filters.join(",")); // Push all Filters
        if (this.bitrate) this.bitrate.forEach(x => {temp.push(x)}); // Push all 
        temp.push(this.outputFile);
        return temp;
    }
    async #run() {
        await this.#errorCheck()
        const p = Deno.run({
            cmd: await this.#formatting(),
            stderr: "piped"
        });
        let error = await p.stderrOutput();
        let status = await p.status();
        await p.close();
        if (status.code !== 0) {
            this.emit('error', new TextDecoder().decode(error));
        } else {
            this.emit('end', status)
        }
    }
}