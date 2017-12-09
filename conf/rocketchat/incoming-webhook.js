class Script {



    process_incoming_request({
        request
    }) {
        var alertColor = "warning";

        if (request.content.status == "resolved") {
            alertColor = "good";
        } else if (request.content.status == "firing") {
            alertColor = "danger";
        }
        console.log(request.content);

        let finFields = [];
        for (i = 0; i < request.content.alerts.length; i++) {
            var endVal = request.content.alerts[i];
            var elem = {
                title: "alertname: " + endVal.labels.alertname,
                value: "*instance:* " + endVal.labels.instance,
                short: false
            };

            finFields.push(elem);
            finFields.push({title: "description", value: endVal.annotations.description});
            finFields.push({title: "summary", value: endVal.annotations.summary});
        }



        return {
            content: {

                username: "Prometheus Alert",
                attachments: [{
                    color: alertColor,
                    title_link: request.content.externalURL,
                    title: "Prometheus notification",
                    fields: finFields,

                }]

            }
        };

        return {
            error: {
                success: false
            }
        };
    }
}
