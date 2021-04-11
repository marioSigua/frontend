<template>
    <div class="ExamType" id="Identification">
        <h2>Identification</h2>
        <label for="Topic">Topic: </label>
        <input type="text" v-model="identificationValues.topic" />
        <div>
            <p>Question</p>
            <textarea
                v-model="identificationValues.question"
                rows="4"
                cols="50"
            ></textarea
            ><br />
            <label for="Answer">Answer </label>
            <input
                v-model="identificationValues.student_input"
                type="text"
            /><br /><br />
        </div>
    </div>
</template>

<script>
    export default {
        props: ['identificationValues'],
    }
</script>
