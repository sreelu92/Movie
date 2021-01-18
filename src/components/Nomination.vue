<template>
  <div id="moviecontainer">
      <div id="moviediv2">
      <div id="display2" v-for="movie in movies" :key="movie.imdbID">
        <h4>{{ "Name: " + movie.Title }}</h4>
        <h4>{{ "Year: " + movie.Year }}</h4>
        <h5>{{ "Type: " + movie.Type }}</h5>
         <button>Nominate</button>
         <nomination-page :imdbid="movie.imdbID"></nomination-page>
      </div>
     
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "nomination-page",
  data() {
      return {
          lists:[]
      };
  },
  props: {
    imdbid: Number,
  },
  methods: {
    viewlist: function () {
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
          this.lists = response.data.Search;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
#moviecontainer{
  #moviediv2 {
      min-height: 60vh;
    display: grid;
    row-gap: 2vh;
    grid-template-columns: repeat(auto-fit,minmax(250px,1fr));
    #display2 {
        width: 50%;
      border: 1px solid black;
    }
  }

}
</style>