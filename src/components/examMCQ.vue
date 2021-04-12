<template>
    <div class="ExamType" id="Multiple choice">
     <b-button-close></b-button-close>
        <h2>Multiple Choice</h2>
        <label for="Topic">Topic: </label>
        <input type="text" v-model="mcqValues.topic" />
        <div>
            <p>Question</p>
            <textarea
                v-model="mcqValues.question"
                id="IdentAnswer"
                name="IdentAnswer"
                rows="4"
                cols="50"
            ></textarea
            ><br />
            <div>
                <input
                    type="radio"
                    name="frequency"
                    checked="checked"
                    class="circle"
                />
                <label for="A">A) </label>
                <input v-model="mcqValues.choices.a" type="text" /><br />
            </div>
            <div>
                <input
                    type="radio"
                    name="frequency"
                    checked="checked"
                    class="circle"
                />
                <label for="B">B) </label>
                <input v-model="mcqValues.choices.b" type="text" /><br />
            </div>
            <div>
                <input
                    type="radio"
                    name="frequency"
                    checked="checked"
                    class="circle"
                />
                <label for="C">C) </label>
                <input v-model="mcqValues.choices.c" type="text" /><br />
            </div>
            <div>
                <input
                    type="radio"
                    name="frequency"
                    checked="checked"
                    class="circle"
                />
                <label for="D">D) </label>
                <input v-model="mcqValues.choices.d" type="text" /><br />
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: ['mcqValues'],
    }
</script>
