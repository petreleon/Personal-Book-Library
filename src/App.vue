<template>
  <div id="app">
    <b-dropdown variant="primary" :text="data.folders[current].name" class="m-md-2">
      <b-button-group vertical>
        <b-button-group v-for="(item, index) in data.folders" :key="item.name" block>
            <b-button block @click="() => changeFolder(index)">{{data.folders[index].name}}</b-button>
            <b-button v-if="index != current" @click="() => deleteFolder(index)">delete</b-button>
        </b-button-group>
      </b-button-group>
      <b-dropdown-divider></b-dropdown-divider>
      <b-dropdown-item v-b-modal.modal-name-folder @click="() => createFolder('New folder')">create one</b-dropdown-item>
    </b-dropdown>
    <b-button @click="() => save()" >save</b-button>
    <b-button @click="() => newBook()">new book</b-button>
    <b-button v-b-modal.modal-folder-name>edit folder name</b-button>
    

    
    <b-modal id="modal-edit-book" title="Edit element" ok-only >
      <bookEditing :book="toEdit.object"/>
    </b-modal>
    <b-modal id="modal-folder-name" title="Edit name of folder" ok-only >
      <b-form-input placeholder="Insert a name" v-model="data.folders[current].name"/>
    </b-modal>
    <b-form-group
      label="Filter"
      label-for="filter-input"
      label-cols-sm="3"
      label-align-sm="center"
      label-size="sm"
      class="mb-0"
    >
      <b-input-group size="sm">
        <b-form-input
          id="filter-input"
          v-model="filter"
          type="search"
          placeholder="Type to Search"
        ></b-form-input>

        <b-input-group-append>
          <b-button :disabled="!filter" @click="filter = ''">Clear</b-button>
        </b-input-group-append>
      </b-input-group>
    </b-form-group>
    <b-table
      :items="data.folders[current]['books']"
      :fields="fields"
      :filter="filter"
      :filter-included-fields="filterOn"
      :sort-by.sync="sortBy"
      :sort-desc.sync="sortDesc"
      :sort-direction="sortDirection"
      stacked="md"
      show-empty
      small
    >
      <template #cell(actions)="row">
        <b-button @click="() => deleteBook(row.item.bookID)"> Delete </b-button>
        <b-button @click="() => editBook(row.item)" >edit</b-button>
        <b-dropdown id="dropdown-1" text="move to" class="m-md-2">
          <b-dropdown-item v-for="folder in otherFolders" v-bind:key="folder.folderID" @click="() => moveBook(folder.folderID, row.item)">{{folder.name}}</b-dropdown-item>
        </b-dropdown>
      </template>

    </b-table>
  </div>
</template>

<script>
import bookEditing from './components/bookEditing'
import bookService from './services/bookService'
export default {
  name: 'App',
  components: {
    bookEditing
  },
  data() {return {
    current: 0,
    data: bookService.data,
    toEdit:{
      bool:false,
      switch_:0,
      object:null
    },
    fields:[
    //   {key:"bookID", label:"ID", sortable: true},
      {key:"title", label:"Title", sortable: true},
      {key:"author", label:"Author", sortable: true},
      {key:"description", label:"Description"},
      {key:"rating1", label:"First Rating"},
      {key:"rating2", label:"Second Rating"},
      {key:"actions", label: ""}
    ],
    sortBy: '',
    sortDesc: false,
    sortDirection: 'asc',
    filter: null,
    filterOn: [],
  }},
  methods:{
    changeFolder: function(index){
      this.current = index
    },
    deleteFolder: function(index){
      bookService.delete_folder(index)
      if (this.current > index){
        this.current --;
      }
    },
    createFolder: function(name){
      bookService.add_folder(name)
      this.current =  this.data.folders.length - 1
      this.$bvModal.show("modal-folder-name")
    },
    deleteBook: function(bookID){
      bookService.delete_book(this.data.folders[this.current].folderID, bookID)
    },
    moveBook: function(toFolderID, book){
      bookService.move_book(this.data.folders[this.current].folderID, toFolderID, book)
    },
    editBook: function(bookToEdit){
      this.toEdit.object = bookToEdit
      this.$bvModal.show("modal-edit-book")
    },
    newBook: function(){
      let book = {
        title: "",
        author: "",
        description: "",
        rating1: 'like',
        rating2: 3
      }
      this.toEdit.object = bookService.add_book(this.data.folders[this.current].folderID, book)
      this.$bvModal.show("modal-edit-book")
    },
    save: function() {
      bookService.save()
    },
  },
  computed:{
    otherFolders:function(){

      return this.data.folders.filter((folder) => {
        return folder.folderID != this.data.folders[this.current].folderID
      })
    }
  }
}
</script>

<style>
#app {
  display: block;
}
</style>
