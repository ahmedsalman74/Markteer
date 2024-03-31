class ApiFeatures {
    constructor(mongooseQuery, queryString) {
        this.mongooseQuery = mongooseQuery;
        this.queryString = queryString;
    }

    filter() {
        const queryObj = { ...this.queryString };
        const excludedFields = ['page', 'sort', 'limit', 'fields','search'];
        excludedFields.forEach(el => delete queryObj[el]);

        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);
        this.mongooseQuery = this.mongooseQuery.find(JSON.parse(queryStr));
        return this;
    }

    search(modelName) {
        if (this.queryString.search) {
            const keyword = this.queryString.search; // Convert to lowercase (optional)
    
            let query;
            if (modelName === "products") {
               query = {
                $or:[

                    { title: { $regex: keyword, $options: 'i' } },
                    { description: { $regex: keyword, $options: 'i' } }
                ]};
            } else {
                query = {
                    name: { $regex: keyword, $options: 'i' }
                }
            }
    
            // Execute the query
            this.mongooseQuery = this.mongooseQuery.find(query);
    
        }
        return this; // Ensure to return 'this' to maintain chaining
    }
    


    sort() {
        if (this.queryString.sort) {
            const sortBy = this.queryString.sort.split(',').join(' ');
            this.mongooseQuery = this.mongooseQuery.sort(sortBy);
        } else {
            this.mongooseQuery = this.mongooseQuery.sort('-createdAt');
        }
        return this;
    }

    limitFields() {
        if (this.queryString.fields) {
            const fields = this.queryString.fields.split(',').join(' ');
            this.mongooseQuery = this.mongooseQuery.select(fields);
        } else {
            this.mongooseQuery = this.mongooseQuery.select('-__v');
        }
        return this;
    }

    paginate(documentCount) {

        const page = this.queryString.page * 1 || 1;
        const limit = this.queryString.limit * 1 || 100;
        const skip = (page - 1) * limit;
        const endIndex = page * limit;

        const paginations = {};
        paginations.currentPage = page;
        paginations.limit = limit;
        paginations.numberOfPages = Math.ceil(documentCount / limit);

        //next page
        if (endIndex < documentCount) {
            paginations.nextPage = page + 1
        }
        if (skip > 0) {
            paginations.prevPage = page - 1
        }

        this.mongooseQuery = this.mongooseQuery.skip(skip).limit(limit);
        this.paginationResults = paginations;
        return this;
    }
}
module.exports = ApiFeatures;