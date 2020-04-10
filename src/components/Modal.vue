<template>
    <div id="modal-template">
        <transition name="modal">
            <div class="modal-mask">
                <div class="modal-wrapper">
                <div class="modal-container">

                    <h2 class="modal-header">
                        {{ routeName }} Rating Form
                    </h2>

                    <div class="modal-body">
                        <p>
                            On a scale from 1 - 5 how would you rate {{ routeName }}? *
                        </p>
                        <p
                            v-if="showRequired"
                            class="required-warning"
                        >
                            *Required - please submit a rating that is between 1 and 5 stars
                        </p>
                        <input
                            v-model="stars"
                            class="scaleInput" 
                            type="number" 
                            min="1" max="5"
                        >
                        <p>
                            How many times did you climb/attempt to climb {{ routeName }}?
                        </p>
                        <input
                            v-model="attempts"
                            class="scaleInput" 
                            type="number" 
                            min="1" max="300">
                        <p>
                            Do you have any comments about this route that you would like to share with the route setters?
                        </p>
                        <textarea
                            v-model="comments"
                            class="scaleInput" 
                            type="text">
                        </textarea>
                        <p class="required">* = required</p>
                    </div>

                    <div class="modal-footer">
                        <button class="modal-submit-button" @click="postReview()">
                            Submit
                        </button>
                        <button class="modal-close-button" @click="$emit('close')">
                            Exit
                        </button>
                    </div>
                </div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    name: 'Modal',
    data() {
        return {
            stars: '',
            attempts: '',
            comments: '',
            showRequired: false,
        }
    },
    props: {
        routeData: Object,
        routeName: String,
    },
    methods: {
        postReview() {
            const feedbackObj = {};

            feedbackObj.Route = this.routeData.ID;

            if (this.stars !== '' && this.stars > 0 && this.stars < 6) {
                feedbackObj.Rating = this.stars;
                

                if (this.attempts !== '') {
                    feedbackObj.Attempts = this.attempts;
                }

                if (this.comments !== '') {
                    feedbackObj.Feedback = this.comments;
                }
                const modal = this;
                axios.post(`${process.env.VUE_APP_BASE_URL}/api/reviews`, feedbackObj)
                    .then(function (response) {
                        if(response.status === 200) {
                            modal.$emit('close');
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            } else {
                this.showRequired = true;
            }
        },
    },
}
</script>

<style scoped>
.modal-header {
  background-color:rgba(0, 0, 0, 0.05);
  color: rgba(0,0,0,.75);
  padding: 30px 30px 15px 30px;
}

.required {
    color: rgba(256, 0 , 0, .8);
}

.required-warning {
    color: rgba(256, 0 , 0, .8);
    margin-top: 0;
}

.modal-body {
    padding: 0px 30px;
    margin: 20px 0;
}

.modal-footer {
    padding: 0px 30px 55px 30px;
}

.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.scaleInput {
    border-radius: 4px;
    border: solid 2px rgba(0,0,0,.15);
    height: 15px;
    padding: 3px 5px;
    width: 93%;
}

textarea {
    min-width: 93%;
    max-width: 93%;
    min-height: 40px;
}

p {
    margin-bottom: .5em;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 500px;
  margin: 0px auto;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

h2 {
  margin-top: 0;
}

button {
  float: right;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 500;
  padding: 7px 15px;
}

.modal-close-button {
  border: solid 2px red;
  color: red;
  margin-right: 10px;
}

.modal-close-button:hover {
    border-color: #c80000;
    color: #c80000;
}

.modal-submit-button {
  border: solid 2px rgba(2, 118, 253, .8);
  background-color: rgba(2, 118, 253, .8);
  color: white;
  font-weight: 600;
}

.modal-submit-button:hover {
    border-color: rgba(2, 118, 253, .6);
    background-color: rgba(2, 118, 253, .6);
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}

@media(max-width: 815px) {
  .modal-container {
    width: 350px;
  }
}
</style>
