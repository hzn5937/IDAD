const marks = {
    components: {
        paginate: VuejsPaginateNext,
    },
    data() {
        return {
            pageSize: 3,
            currentPage: 1,
            students: [
                {name: 'Alice', marks: 80},
                {name: 'Bob', marks: 70},
                {name: 'Charlie', marks: 60},
                {name: 'David', marks: 50},
                {name: 'Eve', marks: 40},
                {name: 'Frank', marks: 30},
                {name: 'Grace', marks: 20},
                {name: 'Helen', marks: 10},
                {name: 'Ivy', marks: 90},
                {name: 'Jack', marks: 80},
                {name: 'Kevin', marks: 70},
                {name: 'Lily', marks: 60},
                {name: 'Mary', marks: 50},
                {name: 'Nancy', marks: 40},
                {name: 'Oscar', marks: 30},
                {name: 'Peter', marks: 20},
                {name: 'Queen', marks: 10},
                {name: 'Rose', marks: 90},
                {name: 'Sam', marks: 80},
                {name: 'Tom', marks: 70},
                {name: 'Uma', marks: 60},
                {name: 'Vicky', marks: 50},
                {name: 'Will', marks: 40},
                {name: 'Xavier', marks: 30},
                {name: 'Yvonne', marks: 20},
                {name: 'Zoe', marks: 10}
            ]
        }
    },
    template: `
        <h1>Student Marks</h1>
        <v-col cols="12">
            <v-row>
                <table class="table table-bordered table-striped">
                    <caption id="student-marks-caption">Table of Student Marks</caption>
                    <thead>
                        <tr>
                            <th id="th-name" scope="col">Name</th>
                            <th id="th-marks" scope="col">Marks</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="student in displayStudents" :key="student.name">
                            <td headers="th-name">{{ student.name }}</td>
                            <td headers="th-marks">{{ student.marks }}</td>
                        </tr>
                    </tbody>
                </table>
            </v-row>
        </v-col>
        
        <v-col cols="12">
            <v-row>
                <paginate 
                :page-count="pageCount" 
                :click-handler="clickCallback" 
                :prev-text=" 'Prev' " 
                :next-text="'Next'" 
                :container-class="'pagination'">
                </paginate>
            </v-row>
        </v-col>
    `,
    computed:
    {
        pageCount() {
            return Math.ceil(this.students.length / this.pageSize)
        },
        displayStudents(){
            let currentStudent = (this.currentPage - 1) * this.pageSize;
            let end = currentStudent + this.pageSize;
            return this.students.slice(currentStudent, end);
        },
        
    },
    methods: {
        //sets the clicked page
        clickCallback: function(pageNum) {
          this.currentPage = Number(pageNum);
        }
      }
}