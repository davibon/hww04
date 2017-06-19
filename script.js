var padding = 60;

d3.json("invoice-taipei.json", function (dataSet) {
    var fDataSet = dataSet.filter(function (d) {
        return d.city === "臺北市" &&
            d.date === "2016/8/1" &&
            d.amount > 1000000000;
    })


    bindInvoice(fDataSet);
    renderInvoice(fDataSet);

});

function bindInvoice(dataSet) {
    var selection = d3.select("svg")
        .selectAll("rect")
        .data(dataSet);
    selection.enter().append("rect");
    selection.exit().remove();

    var seleText = d3.select("svg")
        .selectAll("text")
        .data(dataSet);
    seleText.enter().append("text");
    seleText.exit().remove();
}

function renderInvoice(dataSet) {
    var xScale = d3.scale.linear()
        .domain([d3.min(dataSet, function (d) {
            return d.amount;
        }), d3.max(dataSet, function (d) {
            return d.amount;
        })])
        .range([10, 300]);



    d3.selectAll("rect")
        .attr({
            x: 250,
            y: function (d, i) {
                return (5 + 30 * i);
            },
            width: function (d) {
                //console.log(xScale(d.amount));
                return xScale(d.amount);
            },
            height: 20,
            fill: "navy"
        });

    d3.selectAll("text")
        .attr({
            x: 0,
            y: function (d, i) {
                return (20 + 30 * i);
            },
            "font-size": 15
        }).text(function (d) {
            return d.industry;
        });


    var xAxis = d3.svg.axis()
        .scale(xScale)
        .orient("bottom")
        .ticks("5")
        .tickFormat(function (d) {
            console.log(d);
            return (d / 1000000000) + "G";
        });


    d3.select("svg#invoice").append("g")
        .attr("class", "axis")
        .attr("transform", "translate(" + (250 - 10) + "," + (400 - 50) + ")")
        .call(xAxis);
}
