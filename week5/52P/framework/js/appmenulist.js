const app = Vue.createApp({});

//populate menu with a variable
app.component("mymenu", {
    props: ["menu"], //defining the props
    template: `<ul>
		<li v-for="item in menu" :key="item.id">
		<a :href="item.url">{{item}}</a>		
	</ul>`,
});

app.mount("#app");
