const dashboard = {
    data() {
        return {
            test: "ha",
            token: "",
            result: [],
            images: []
        }
    },
    async mounted() {
        var client_id = 'b01d098f7b5d4412aa72b571f4cf672f';
        var client_secret = '4923391b875d4d8f9a5517c26c7e07a8';

        const result = await fetch("https://accounts.spotify.com/api/token", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "Authorization": "Basic " + btoa(client_id + ":" + client_secret)
            },
            body : "grant_type=client_credentials"
        })  

        const token = await result.json()
        this.token = token.access_token

        const result2 = await fetch("https://api.spotify.com/v1/browse/new-releases?limit=2", {
            method: "GET",
            headers: { 
                "Authorization": "Bearer " + this.token
            }
        })
        const data = await result2.json()

        this.test = data
        this.result = data.albums.items
        this.images = data.albums.items[0].images
        
    },
    template: `
        <div class='bg-grey'>
            <h1>Dashboard</h1>
            <div v-if="images.length > 1">
                <img :src="images[1].url" alt="Image 1">
                <img :src="test.albums.items[0].images[1].url" alt="Image 1">
            </div>
            <div v-else>
                Loading images...
            </div>
        </div>
    `
}