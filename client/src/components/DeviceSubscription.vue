<template>
    <div class="container">
		<div class="row">
			<div class="panel panel-primary">
				<div class="panel-heading">
					Subscribe or Unsubscribe a Device
				</div>
				<div class="panel-body">
					<form>
						<div class="row">
							<div class="col-md-6">
								<input type="text" class="form-control" placeholder="Device Id" v-model="deviceId">
							</div>
							<div class="col-md-6">
								<input type="button" class="btn btn-default" value="Check Availability">
								<input type="button" class="btn btn-success" @click="subscribe" value="Subscribe">
								<input type="button" class="btn btn-danger" value="Unsubscribe">
							</div>
						</div>
					</form>
				</div>
			</div>
		</div>
		<div class="row">
			<div class="panel panel-default">
			<!-- Default panel contents -->
			<div class="panel-heading">Subscribed Devices</div>
			<div class="panel-body">
				<p>Following devices are currently active in your account.</p>
			</div>

			<!-- Table -->
			<table class="table">
				<thead>
					<tr>
						<th>Device Id</th>
						<th>Last Active</th>
						<th>Status</th>
					</tr>
				</thead>
				<tbody >
					<tr>
						<td>pe20180306</td>
						<td>2018/06/05</td>
						<td>Disconnected</td>
					</tr>
					<tr>
						<td>pe20180306</td>
						<td>2018/06/05</td>
						<td>Disconnected</td>
					</tr>
				</tbody>
			</table>
			</div>
		</div>
    </div>
</template>

<script>
import axios from "axios";

export default {
	name: 'DeviceSubscription',
	data () {
		return {
			deviceId: null,
			devices: [{
				deviceId: "pe20180306",
				date: "2018/06/05",
				status: "Disconnected"
			}]
		}
	},
	methods: {
		subscribe(){
			axios.post(`/api/subscribe/${this.deviceId}/u001`).then((res) => {
				this.deviceId = null;        
				alert("Devices is subscribed successfully");
			}).catch((e) => {
				alert("Failed to subscribe the device");
			});
			
		}
	}
  
}
</script>

<style scoped>


</style>
