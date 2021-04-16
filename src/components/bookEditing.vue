<template>
    <div>
        <p>{{book}}</p>
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
export default {
    name:"edit",
    props:['book'],
    data: function(){
        return {
            optionsRating1:['like', 'dislike', 'neutral'],
            optionsRating2:[1,2,3,4,5]
        }
    }
}
</script>

<style>

</style>