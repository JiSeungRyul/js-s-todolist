<template>
    <div class="quote-container">
        <h1>Quote of the Day</h1>
        <div v-if="quote">
            <p>{{ quote }}</p>
            <p>{{ author }}</p>
        </div>
        <div v-else>
            <p>Loading...</p>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'QuoteOfTheDay',  
    data() {
        return {
            quote: '',
            author: ''
        };
    },
    async created() {
        try {
            const response = await axios.get('http://localhost:5000/api/quote'); // 프록시 서버로 요청
            console.log(response.data)
            // this.quote = response.data[0].q + ' - ' + response.data[0].a;
            this.quote = response.data[0].q;
            this.author = response.data[0].a;
        } catch (error) {
            console.error('Error fetching the quote:', error);
        }
    }
};
</script>

<style>

</style>