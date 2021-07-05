deno run \
--allow-write=./logs/ \
--allow-read=./config.json,./keys.json \
--allow-net=0.0.0.0:6969,api.thedogapi.com,api.thecatapi.com,api.urbandictionary.com,quotes15.p.rapidapi.com \
--allow-run=ffmpeg,./ffmpeg/ffmpeg,./ffmpeg/ffmpeg.exe \
mod.ts