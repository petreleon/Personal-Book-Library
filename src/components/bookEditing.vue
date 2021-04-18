<template>
  <div>
    <p>{{book}}</p>
    <b-input-group>
      <b-form-input placeholder="Enter the bookID from Google Books" v-model="inputGoogleBooksID"></b-form-input>
      <b-input-group-append>
      <b-button @click="() => bookExtract()" variant="success">Extract</b-button>
    </b-input-group-append>
    </b-input-group>
    
      <b-form-input placeholder="Title" v-model="book.title"/>
      <b-form-input placeholder="Author" v-model="book.author"/>
      <b-form-input placeholder="Description" v-model="book.description"/>
      <b-form-radio-group
          id="btn-radios-1"
          v-model="book.rating1"
          :options="optionsRating1"
          name="radios-btn-default"
          buttons
      ></b-form-radio-group>
      <b-form-radio-group
          id="btn-radios-1"
          v-model="book.rating2"
          :options="optionsRating2"
          name="radios-btn-default"
          buttons
      ></b-form-radio-group>
  </div>
</template>

<script>
import bookService from '../services/bookService'
export default {
    name:"edit",
    props:['book'],
    data: function(){
        return {
            optionsRating1:['like', 'dislike', 'neutral'],
            optionsRating2:[1,2,3,4,5],
            inputGoogleBooksID:''
        }
    },
    methods:{
      bookExtract:function(){
        bookService.complete_book_with_google_books(this.inputGoogleBooksID, this.book)
      }
    }
}
</script>

<style>

</style>