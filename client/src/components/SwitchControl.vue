<template>
    <div class="btn-group">
        <button type="button" 
            class="btn dropdown-toggle"
            :class="{'btn-danger': isOn, 'btn-success': !isOn}"
            data-toggle="dropdown" 
            aria-haspopup="true" 
            aria-expanded="true">
            {{ state }} <span class="caret"></span>
        </button>
        <ul class="dropdown-menu">
            <li><a @click="handleOn">On</a></li>
            <li><a @click="handleOff">Off</a></li>
        </ul>
    </div>
</template>

<script>
import axios from "axios";

export default {
    name: "SwitchControl",
    props: {
        deviceId: {
            type:String,
            required: true
        }
    },
    data () {
            return {
                state: "Off",
                isOn: false      
            }
    },
    methods: {
            handleOn() {
                axios.post(`/api/switch/${this.deviceId}/ON`).then((res) => {
                    this.state = "On";
                    this.isOn = true;
                }).catch((e) => {
                    console.log(e);
                    alert("Unable to switch on the device");
                });
            },
            handleOff() {
                axios.post(`/api/switch/${this.deviceId}/OFF`).then((res) => {
                    this.state = "Off";
                    this.isOn = false;
                }).catch((e) => {
                    alert("Unable to switch on the device");
                });
            }
    }
}
</script>

<style scoped>

</style>
