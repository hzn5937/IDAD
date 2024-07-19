const view = {
    data() {
        return {
            pageSize: 5,
            currentPage: 1,
        }
    },
    components: {
        paginate: VuejsPaginateNext,
    }
}