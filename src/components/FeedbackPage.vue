<template>
  <div class="feedbackPage">
        <h1>General Feedback Form</h1>
        <p class="faded">
            If you have any general questions or concerns about the Penn State climbing wall
            please submit the following form! 
        </p>
        <p
            v-if="requiredError"
            class="required-warning"
        >
            Please make sure you fill out all fields.
        </p>
        <p class="input-label left">Please enter an email you would like responses sent to - this will not be stored or used for any other purpose!</p>
        <p
            v-if="invalidEmail"
            class="required-warning"
        >
            This is an invalid email format, please type in a valid email.
        </p>
        <input v-model="email" class="scaleInput email" type="text">
        <p class="input-label left">Subject</p>
        <input v-model="subject" class="scaleInput input-full" type="text">
        <p class="input-label left">Message Body</p>
        <textarea v-model="content" class="scaleInput input-full" type="text"></textarea>
        <div class="button-container">
            <span
                v-if="success"
                class="email-status success"
            >
                Sent
                <i class="gg-check"></i>
            </span>
            <span
                v-else-if="loading"
                class="email-status"
            >
                <i class="gg-spinner"></i>
            </span>
            <button class="submit-button" @click="postFeedback()">
                Submit
            </button>
        </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'FeedbackPage',
  data() {
    return {
        email: '',
        subject: '',
        content: '',
        requiredError: false,
        invalidEmail: false,
        success: false,
        loading: false,
    }
  },
      methods: {
        postFeedback() {
            const fbPage = this;
            if (this.email !== '' && this.subject !== '' && this.content !== '') {
                if(this.validateEmail(this.email)) {
                    this.loading = true;
                    this.invalidEmail = false;
                    this.requiredError = false;
                    this.success = false;
                    const feedbackObj = {
                        email: this.email,
                        subject: this.subject,
                        content: this.content,
                    };

                    axios.post(`${process.env.VUE_APP_BASE_URL}/api/email`, feedbackObj)
                        .then(function (response) {
                            if(response.status === 200) {
                                fbPage.loading = false;
                                fbPage.success = true;
                            }
                        })
                        .catch(function (error) {
                            fbPage.loading = false;
                            console.log(error);
                        });
                } else {
                    this.invalidEmail = true;
                }
            } else {
                this.requiredError = true;
            }
        },
        validateEmail(email) {
            let re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(String(email).toLowerCase());
        }
    }
}
</script>

<style scoped>
h1 {
    margin-bottom: 0;
}

.required-warning {
    color: rgba(256, 0 , 0, .8);
    margin-top: 0;
}

.faded {
    color: rgba(0,0,0,.6);
}

.left {
    align-self: flex-start;
}

.input-label {
    margin-bottom: 8px;
    margin-top: 20px;
}

.feedbackPage {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0 20%;
  font-family: 'Roboto Condensed', sans-serif;
  text-align: left;
}

.scaleInput {
    border-radius: 4px;
    border: solid 2px rgba(0,0,0,.15);
    height: 15px;
    padding: 3px 5px;
    align-self: flex-start;
}

.email {
    width: 30%;
}

.input-full {
    width: 95%;
}

textarea {
    min-width: 95%;
    max-width: 95%;
    min-height: 250px;
}

.submit-button {
  border: solid 2px rgba(2, 118, 253, .8);
  background-color: rgba(2, 118, 253, .8);
  color: white;
  font-weight: 600;
}

.email-status {
    align-self: flex-start;
    margin-top: 20px;
}

.success {
    color: #4BB543;
    width: 50px;
    display: flex;
    align-items: center;
    justify-content: space-around;
}

.gg-check {
    display: inline-block;
    margin-top: 2px;
}

.button-container {
    display: flex;
    align-items: center;
    width: 100%;
}

button {
  justify-self: flex-end;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 500;
  padding: 10px 25px;
  margin-top: 20px;
  margin-right: 3%;
  margin-bottom: 10vh;
  margin-left: auto;
}

.submit-button:hover {
    border-color: rgba(2, 118, 253, .6);
    background-color: rgba(2, 118, 253, .6);
}

@media only screen and (max-width: 850px) {
  .feedbackPage {
    margin: 0 5%;
  }

  .email {
      width: 95%;
  }
}
</style>