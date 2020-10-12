package main

import (
	"encoding/json"
	"fmt"
	"io"
	"io/ioutil"
	"log"
	"net/http"
	"strconv"

	"github.com/gorilla/mux"
	"github.com/prometheus/client_golang/prometheus/promhttp"
)

type Config struct {
	Port int    `json:"port"`
	Dog  string `json:"dog"`
	Cat  string `json:"cat"`
}

var config Config

func getCat(w http.ResponseWriter, r *http.Request) {
	rs, err := http.Get("https://api.thecatapi.com/v1/images/search?api_key=" + config.Cat)
	if err != nil {
		panic(err)
	}
	defer rs.Body.Close()

	w.Header().Set("Content-Type", "application/json")
	data, err := io.Copy(w, rs.Body)
	if err != nil {
		panic(err)
	}
	json.NewEncoder(w).Encode(data)
}

func getDog(w http.ResponseWriter, r *http.Request) {
	rs, err := http.Get("https://api.thedogapi.com/v1/images/search?api_key=" + config.Dog)
	if err != nil {
		panic(err)
	}
	defer rs.Body.Close()

	w.Header().Set("Content-Type", "application/json")
	data, err := io.Copy(w, rs.Body)
	if err != nil {
		panic(err)
	}
	json.NewEncoder(w).Encode(data)
}

func main() {
	configFile, err := ioutil.ReadFile("./config.json")
	if err != nil {
		panic(err)
	}
	json.Unmarshal(configFile, &config)

	r := mux.NewRouter()

	r.Handle("/metrics", promhttp.Handler())

	r.HandleFunc("/dog", getDog).Methods("GET")
	r.HandleFunc("/cat", getCat).Methods("GET")

	fmt.Println("Denniskoe API > Running on port " + strconv.Itoa(config.Port))

	log.Fatal(http.ListenAndServe(":"+strconv.Itoa(config.Port), r))
}

// client := http.Client{Timeout: time.Second * 2}

// 	req, err := http.NewRequest(http.MethodGet, "https://api.thecatapi.com/v1/images/search?api_key="+config.Cat, nil)
// 	if err != nil {
// 		json.NewEncoder(w).Encode("{ status: error}")
// 		return
// 	}
// 	req.Header.Set("User-Agent", "Denniskoe-Client")

// 	res, err := client.Do(req)
// 	if err != nil {
// 		log.Fatal(err)
// 		return
// 	}

// 	if res.Body != nil {
// 		defer res.Body.Close()
// 	}

// 	v, err := jason.NewObjectFromReader(res.Body)
// 	url, err := v.GetObjectArray()
// 	if err != nil {
// 		log.Fatal(err)
// 		return
// 	}
// 	fmt.Println(url)
