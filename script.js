let app = new Vue({
    el: '#app',
    data: {
        competition: {
            name: 'Click a league to see their table.'
        },
        standings: {
           table: {}
        },
        length: '',
        loading: false,
        display: false,
        url: "http://api.football-data.org/v2/competitions/",
        add: ""
    },
    watch: {
        add() {
            this.getIt();
        },
    },

    methods: {
        async getIt() {
            try {
                this.loading = true;
                axios.get(this.url + this.add, {
                    "headers": { "X-Auth-Token": "9ea8d5e6f7fc434eb7be055bdf75492e" },
                    dataType: 'json',
                }).then(result => {
                    console.log(result.data)
                    this.competition = result.data.competition;
                    if (this.competition.name === "Primera Division") {
                        this.competition.name = "La Liga " + this.competition.name;
                    }
                    this.length = result.data.standings[0].table.length;
                    console.log("competition name set." + this.length);
                    this.standings.table = result.data.standings[0].table;
                    console.log(this.standings.table)
                    this.loading = false;
                    this.display = true;
                })
            }
            catch (error) {
                console.log(error);
            }
        },
        premierLeague() {
            this.add = "PL/standings"
        },

        serieA() {
            this.add = "SA/standings"
        },
        bundesliga() {
            this.add = "BL1/standings"
        },
        laLiga() {
            this.add = "PD/standings"
        },
        ligue1() {
            this.add = "FL1/standings"
        }

    }

});
