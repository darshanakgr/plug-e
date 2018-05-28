<template>
    <div class="container">
		<div class="col-md-6">
			<div class="panel panel-primary">
				<div class="panel-heading">
					Today Insights
				</div>
				<div class="panel-body">
					<div class="list-group">
						<a href="#" class="list-group-item">
							<div class="row">
								<div class="col-xs-8">
									<h4 class="list-group-item-heading">Status</h4>
									<p class="list-group-item-text">{{ device.status }}</p>
								</div>
								<div class="col-xs-4 text-center">
									<switch-control class="switch" :deviceId="'ASD001'"/>
								</div>
							</div>
						</a>
						<a href="#" class="list-group-item">
							<h4 class="list-group-item-heading">Profile</h4>
							<p class="list-group-item-text">{{ device.profile }}</p>
						</a>
						<a href="#" class="list-group-item">
							<h4 class="list-group-item-heading">Power Consumption (kWh)</h4>
							<p class="list-group-item-text">{{ device.powerConsumptionKWH.toString().substring(0, 8) }}</p>
						</a>
						<a href="#" class="list-group-item">
							<h4 class="list-group-item-heading">Power Consumption (LKR)</h4>
							<p class="list-group-item-text">{{ device.powerConsumptionLKR.toString().substring(0, 8) }}</p>
						</a>
						<a href="#" class="list-group-item">
							<h4 class="list-group-item-heading">Estimated Usage (LKR)</h4>
							<p class="list-group-item-text">{{ device.estimatedUsage.toString().substring(0, 8) }}</p>
						</a>
					</div>
				</div>
			</div>
		</div>
		<div class="col-md-6">
			<div class="panel panel-primary">
				<div class="panel-heading">
					Weekly Usage
				</div>
				<div class="panel-body">
					<line-chart :chart-data="datacollection" :options="{responsive: true, maintainAspectRatio: false}" :height="335"></line-chart>
				</div>
			</div>
		</div>
    </div>
</template>

<script>
import LineChart from "./chart/LineChart";
import SwitchControl from "./SwitchControl";
import axios from "axios";

export default {
	name: 'DeviceDetail',
	components: {
		LineChart,
		SwitchControl
	},
	data () {
		return {
			device: {
				device_id: "ASD001",
				status: "Connected",
				profile: "Profile 1",
				powerConsumptionKWH: 0,
				powerConsumptionLKR: 0,
				estimatedUsage: 10
			},
			datacollection: undefined
		}
	},
	mounted () {
      	this.fillData()
	},
	methods: {
		fillData () {
			const d = new Date()
			axios.get(`/api/usage/${this.device.device_id}/${d.getFullYear()}/${d.getMonth()}`).then((usage) => {
				let data = [0, 0, 0, 0, 0, 0, 0];
				let totalConsumption = 0;
				if(usage.data){
					let usages = usage.data;
					for(let u in usages){
						data[usages[u].day] += usages[u].usage * 2.5;
						totalConsumption += usages[u].usage * 2.5;
					} 
				}
				this.device.estimatedUsage = totalConsumption / 7;
				this.datacollection = {
						labels: ["Sun", "Mon", "Tue", "Wed", "Thr", "Fri", "Sat"],
						datasets: [
							{
								label: "LKR",
								backgroundColor: '#8e44ad',
								data: data
							}
						]
				}
			}).catch((e) => {
				console.log(e);
			});
		}
    },
    created(){
		setInterval(() => {
			const d = new Date()
			axios.get(`/api/usage/${this.device.device_id}/${d.getFullYear()}/${d.getMonth()}/${d.getDate()}`).then((usage) => {
				if(usage.data){
					this.device.powerConsumptionKWH = usage.data.usage;
				}else{
					this.device.powerConsumptionKWH = 0;
				}
				this.device.powerConsumptionLKR = this.device.powerConsumptionKWH * 2.5;
			}).catch((e) => {
				this.device.powerConsumptionKWH = 0;
				this.device.powerConsumptionLKR = 0;
			});
		}, 3000);
		
	}
  
}
</script>

<style scoped>

.switch{
	margin: 4px auto;
}

</style>
