/**
 * Created by sjonl on 15-06-2018.
 */
$(function () {

    var model = {
        cats : [{
            name: "cat1",
            clicksCount: 0,
            imgUrl: "img/cat1.jpg"
        }, {
            name: "cat2",
            clicksCount: 0,
            imgUrl: "img/cat2.jpg"
        }, {
            name: "cat1",
            clicksCount: 0,
            imgUrl: "img/cat3.jpg"
        }],
        currentCat : model.cats[0]
    };

    var view_list = {
        init : function () {
            this.catList = $(".cat_list");
            this.catNames = [];
            for(var i = 0; i <= model.cats.length; i++){
                var name = model.cats[i].name;
                catNames.push(name);
            }
            view_list.render();
        },
        render : function () {
            var catList = this.catList,
                catNames = this.catNames;

            var htmlstr = '';
            for(var i = 0; i <= catNames.length; i++ ){
                htmlstr += "<li>"+catNames[i]+"</li>";
            }
            catList.html(htmlstr);
        }
    };

});
