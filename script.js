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
    var selection = d3.select("svg#invoice")
        .selectAll("rect")
        .data(dataSet);
    selection.enter().append("rect");
    selection.exit().remove();

    var seleText = d3.select("svg#invoice")
        .selectAll("text")
        .data(dataSet);
    seleText.enter().append("text");
    seleText.exit().remove();
}

function renderInvoice(dataSet) {
    var xScale = d3.scale.linear()
        .domain([0, d3.max(dataSet, function (d) {
            return d.amount;
        })])
        .range([10, 300]);



    d3.selectAll("#invoice>rect")
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

    d3.selectAll("#invoice>text")
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
        .ticks("3")
        .tickFormat(function (d) {
            console.log(d);
            return (d / 1000000000) + "G";
        });


    d3.select("svg#invoice").append("g")
        .attr("class", "axis")
        .attr("transform", "translate(" + (250 - 10) + "," + (400 - 50) + ")")
        .call(xAxis);
}




        //速度函式橫桿

        var svgBall = d3.select("svg#sball");

        svgBall.append("g").append("rect").attr({
            fill: "white",
            width: "100%",
            height: "100%"
        });

        //--------------------------------
        var easeArr = ["linear", "quad", "cubic", "sin", "exp", "circle", "elastic", "back", "bounce"];

        bindBall(easeArr);
        renderBall();

        function bindBall(dataSet) {
            var selection_circle = d3.select("svg#sball").selectAll("#sball>circle").data(dataSet);
            var selection_text = d3.select("svg#sball").selectAll("#sball>text").data(dataSet);
            var selection_line = d3.select("svg#sball").selectAll("#sball>line").data(dataSet);

            // 初始化設定
            selection_line.enter().append("line").attr({
                x1: 100,
                y1: function(d, i) {
                    return 20 + i * 35;
                },
                x2: 300,
                y2: function(d, i) {
                    return 20 + i * 35;
                },
                stroke: "lightgreen"
            }).text(function(d) {
                return d;
            });
            selection_line.exit().remove();

            selection_circle.enter().append("circle").attr({
                cx: 100,
                cy: function(d, i) {
                    return 20 + i * 35;
                },
                r: 15,
                fill: "gold"
            });
            selection_circle.exit().remove();

            selection_text.enter().append("text").attr({
                x: 5,
                y: function(d, i) {
                    return 25 + i * 35;
                },
                fill: "black"
            }).text(function(d) {
                return d;
            });
            selection_text.exit().remove();


        }

        function renderBall() {

            //需要動畫的設定
            d3.select("#sball").selectAll("#sball>circle")
                .on("click", function(d) {
                    console.log(d3.select(this).attr("cx"));
                    var nowCx = d3.select(this).attr("cx");
                    if (nowCx > 100) {
                        nowCx = 100;
                    } else {
                        nowCx = 300;
                    }
                    d3.select(this).transition()
                        .ease(d)
                        .attr({
                            cx: nowCx
                        });
                });


        }
