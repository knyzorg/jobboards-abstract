
module.exports = (db) => {
    /**
    * 
    * @param {String} title Title of the job posting
    * @param {String} author {name: "First Last", email: "foo@bar.com"}
    * @param {String} company Company name
    * @param {Object} location Location {country: "United States", countryCode: "US", state: "California", city: "Someplace", zip: "12223"}
    * @param {String} description 
    * @param {String} salary 
    */
    function postJob(insertObj, callback) {
        let insertObj = {
            title: title,
            author: author,
            company: company,
            location: location,
            description: description,
            salary: salary
        }
        collection.insert(insertObj, function (err) {
            if (err) return callback(false);;
            // Object inserted successfully.
            callback(insertObj._id); // this will return the id of object inserted
        });
    }

    function removeJob(refID) {
        db.test_users.remove( {"_id": ObjectId(refID)});
    }

    function getJobs(callback) {
        let jobs = []
        db.getCollection('jobs').find({}).each((err, doc) => {
            jobs.push(doc);
            if (doc == null) {
                callback(jobs);
            }
        })
    }

    function locantoXML(cb) {
        let document = { '?xml version=\"1.0\" encoding=\"iso-8859-1\"?': null, locanto: [] }
        getJobs((jobs) => {
            jobs.forEach((job) => {
                document.locanto.push(
                    {
                        ad: {
                            id: job._id.substr(0, 20),
                            title: job.title,
                            description: job.description,
                            url: "https://placetoapply.com/apply/" + job._id.toString(),
                            mobile_url: "https://placetoapply.com/apply/" + job._id.toString(),
                            email: job.author.email,
                            city: job.location.city,
                            zip: job.location.zip,
                            state: job.location.state,
                            country: job.location.countryCode,
                            salary: job.salary,
                            company: job.company,

                        }
                    }
                )
            })
        })

        var o2x = require('object-to-xml');
        cb(o2x(document));
    }
};