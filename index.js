function main(x, tid, min, con) {

    var html2 = '';
    console.log('******************************* Homework *********************************');

    var support = (tid * min) / 100;
    var item =x
    var order = []
    item.forEach(function (arr) {
        arr.item.forEach(function (arr2) {
            order.push(arr2)


        });

    });
    //console.log(order);

    var sorted_arr = order.slice().sort();
    var results = [];
    for (var i = 0; i < sorted_arr.length; i++) {
        if (sorted_arr[i + 1] != sorted_arr[i]) {
            results.push([sorted_arr[i]]);
        }
    }
    //console.log(results);


    var Frequent = []

    results.forEach(function (data) {
        var count = 0
        item.forEach(function (check) {

            if (contains(check.item, data) == true) {
                //console.log(data,":pass");
                count += 1
                //
            }
        });
        if (count >= support) {
            Frequent.push({ item: data, sup: count })
        }



    });
    //console.log(Frequent);
    var subset = []
    Frequent.forEach(function (yyy) {
        yyy.item.forEach(function (tong) {
            subset.push(tong)
        });


    });
    //console.log(subset);

    const getAllSubsets =
        theArray => theArray.reduce(
            (subsets, value) => subsets.concat(
                subsets.map(set => [value, ...set])
            ),
            [[]]
        );


    var test = getAllSubsets(subset)
    test.forEach(function (L2) {


        var t = 0
        // for (let i = 2; i <Frequent.length; i++) {



        if (L2.length > 1) {


            item.forEach(function (check) {

                if (contains(check.item, L2) == true) {

                    t += 1;

                }
            });

            // } 
        } if (t >= support&&L2!='') {
            Frequent.push({ item: L2, sup: t })
        }


    });

    console.log(Frequent);
    Frequent.forEach(function (Frequent) {
        html2 += " {" + Frequent.item + "} Support:" + (Frequent.sup / tid) * 100 + "%<br>";
    });


    function contains(haystack, needles) {

        return needles.map(function (needle) {
            return haystack.indexOf(needle);
        }).indexOf(-1) == -1;
    }

    html2 += "<h6>Frequent itemset=" + Frequent.length + "<br></h6><hr>"
    console.log("**************************** Frequent=" + Frequent.length + " *********************************");

    var data = Frequent;


    const getAllSubsets2 =
        theArray => theArray.reduce(
            (subsets, value) => subsets.concat(
                subsets.map(set => [value, ...set])
            ),
            [[]]
        );

    //var test =[{item:['b','c','e'],sup:3}]

    //console.log(arr);

    var u = []
    var countrule = 0
    data.forEach(function (L) {
        u.push(L.sup)
        //console.log(L);


        if (L.item.length > 1) {
            var arr = getAllSubsets2(L.item)

            arr.forEach(function (p) {

                if (contains(L.item, p) == true && p != '' && p.length != L.item.length) {

                    data.forEach(function (last) {

                        


                            if (p.sort().toString() == last.item.sort().toString() && (L.sup / last.sup) * 100 > con) {
                                // console.log(last.item,last.sup);

                                var t = removeFromArray(L.item, p)
                                console.log("{", p.toString(), "}", "---->", t.toString(), "==", (L.sup / last.sup) * 100, "%");
                                html2 += " {" + p.toString() + "}" + "=>" + "{" + t.toString() + "}" + " Confidence:" + (L.sup / last.sup) * 100 + "%<br>";
                                // console.log(html2);

                                countrule += 1
                            }
                        
                    });
                    //document.getElementById(rule).innerHTML=html2;


                    u.forEach(function (test) {
                        if (test != '') {


                        }


                    });


                }
            });
        }

    });
    html2 += '<h6>Association Rule=' + countrule+'</h6>';
    document.getElementById('rule').innerHTML = html2;
    document.getElementById("rule").setAttribute("style", "height: 240px;max-height: 240px; overflow: auto;background: white; border-radius: 7px;border: 1px solid rgb(192, 192, 192);"); 
    console.log("************************ Association Rule=", countrule, "***************************");

    function contains(haystack, needles) {

        return needles.map(function (needle) {
            return haystack.indexOf(needle);
        }).indexOf(-1) == -1;
    }
    //console.log(contains(arr2,arr1))

    function arrayRemove(arr, value) {
        return arr.filter(function (ele) {
            return ele != value


        })

    }

    function removeFromArray(original, remove) {
        return original.filter(value => !remove.includes(value));
    }
}


var tid = 0
function table() {
    var table = document.getElementById("table").value;
    tid = table;
    var htmlsup = '<input type="number"   class="form-control col-6" name="minsup" id="minsup" aria-describedby="helpId" placeholder="min support(%)"></input>' + '<input type="number"   class="form-control col-6"   name="mincon" id="mincon" aria-describedby="helpId" placeholder="min confident(%)"></input><br><br>';
   var html=''
    for (var i = 0; i < table; i++) {

        html += '<input type="text"   class="form-control" name="' + i + '" id="' + i + '" aria-describedby="helpId" placeholder="ex:A,B,C,D"></input><br><br>';



    }
    var button= '<button type="button"  class="col-12 btn btn-outline-secondary " onclick="inputarr()">APRIORI</button>';

    console.log(html)
    document.getElementById('showbox').innerHTML = html;
    document.getElementById('showbutton').innerHTML = button;
    document.getElementById('showsup').innerHTML = htmlsup;
}
function inputarr() {
    var k = []
    var min = document.getElementById('minsup').value;
    var con = document.getElementById('mincon').value;
    console.log(min);

    for (var i = 0; i < tid; i++) {
        if(document.getElementById(i).value!=''){
        var array = document.getElementById(i).value.split(",");
        k.push({ item: array.map(str => str.replace(/\s/g, '')) });}
    }
    console.log(k);

    main(k, tid, min, con)
}