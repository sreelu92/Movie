<template>
  <div id="container">
    <h2>The Shoppies</h2>
    <input type="text" v-model="name" />

    <button @click="searchmovie">Search</button><br /><br />
    <div id="moviediv">
      <div id="display" v-for="movie in movies" :key="movie.imdbID">
        <h4>{{ "Name: " + movie.Title }}</h4>
        <h4>{{ "Year: " + movie.Year }}</h4>
        <h5>{{ "Type: " + movie.Type }}</h5>
        <button @click="nominateList(movie.imdbID)" id="nominateButton">
          Nominate
        </button>
        <!-- <nomination-page :imdbid="movie.imdbID"></nomination-page> -->
      </div>
    </div>
    <h3>NOMINATION LIST</h3>
    <div v-if="!show" id="moviediv2">
      <div id="display2" v-for="content in contents" :key="content.imdbID">
        <h4>{{ "Name: " + content.Title }}</h4>
        <h4>{{ "Year: " + content.Year }}</h4>
        <h5>{{ "Type: " + content.Type }}</h5>
        <button @click="removeMovie(content.imdbID)">Remove</button>
      </div>
    </div>
    <h3>{{status}}</h3>
  </div>
</template>

<script>
import axios from "axios";
// import NominationPage from '../components/Nomination.vue'
export default {
  name: "search-page",
  //   components: {
  //       NominationPage,
  //   },
  data() {
    return {
      name: "",
      movies: [],
      contents: [],
      show: true,
      status:""
    };
  },
  methods: {
    searchmovie: function () {
      axios
        .request({
          url: "http://www.omdbapi.com/?apikey=fefc6659&",
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          params: {
            s: this.name,
          },
        })
        .then((response) => {
          console.log(response);
          this.movies = response.data.Search;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    nominateList(imdbID) {
        
        axios
          .request({
            url: "http://www.omdbapi.com/?apikey=fefc6659&",
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            params: {
              i: imdbID,
            },
          })
          .then((response) => {
            console.log(response);
           
            this.show = false;
            if(this.contents.length>4){
                this.status="You can nominate only five movies"

            }
            else{
                 this.contents.push(response.data);

            }

          })
          .catch((error) => {
            console.log(error);
          });
      
    },
    removeMovie(imdbID) {
      this.contents.splice(imdbID, 1);
    },
  },
};
</script>

<style lang="scss" scoped>
#container {
  #moviediv {
    min-height: 60vh;
    display: grid;
    row-gap: 2vh;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    #display {
      width: 50%;
      border: 1px solid black;
    }
  }
  #moviediv2 {
    min-height: 60vh;
    display: grid;
    row-gap: 2vh;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    #display2 {
      width: 50%;
      border: 1px solid black;
    }
  }
}
</style>