<template>
    <v-row>
        <v-col class="d-flex justify-center">
            <v-card width="80%" variant="text">
                <v-table>
                    <thead>
                        <tr>
                            <th>Code</th>
                            <th>Description</th>
                            <th>cp</th>
                            <th>Type</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="unit in displayUnits" :key="unit.code">
                            <td class="text-start">{{ unit.code }}</td>
                            <td class="text-start">{{ unit.desc }}</td>
                            <td class="text-start">{{ unit.cp }}</td>
                            <td class="text-start">{{ unit.type }}</td>
                        </tr>
                    </tbody>
                </v-table>
            </v-card>
        </v-col>
    </v-row>
    <v-row>
        <v-col cols="12" class="d-flex justify-center">
            <paginate
            :page-count="pageCount"
            :clickHandler="clickCallback"
            :container-class="'pagination'">
            </paginate>
        </v-col>
    </v-row>
</template>

<script>
    import Units from '../assets/units.json'
    import Paginate from 'vuejs-paginate-next'
    export default {
        name: "UnitPage",
        components: {
            paginate: Paginate,
        },
        data()
        {
            return {
                units: Units,
                pageSize: 5,
                currentPage: 1,
            }
        },
        computed: {
            displayUnits() {
            let start = (this.currentPage - 1) * this.pageSize
            let end = start + this.pageSize
            return this.units.slice(start, end)
            },
            pageCount() {
                return Math.ceil(this.units.length / this.pageSize)
            }
        },
        methods: {
            clickCallback(pageNum) {
                this.currentPage = pageNum;
            }
        }
    }
</script>