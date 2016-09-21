var list = function (items) {
  return new tabris.CollectionView({
    layoutData: {left: 0, top: 0, right: 0, bottom: 0},
    items: items,
    refreshEnabled: true,
    itemHeight: 120,
    initializeCell: function(cell) {

      var image = new tabris.ImageView({
        layoutData: {top: 0, left: 0, right: 0, bottom: 0},
        scaleMode: "fill",
        opacity: 0.2
      }).appendTo(cell);

      var title = new tabris.TextView({
        layoutData: {left: "5%", top: "5%", right: "5%"},
        font: "bold 24px",
        alignment: "left"
      }).appendTo(cell);
      /*var image2 = new tabris.ImageView({
        layoutData: {top: 0, left: [image1,0], width: picWidth, height: 100},
        scaleMode: "fill",
        opacity: 0.3
      }).appendTo(cell);
      var image3 = new tabris.ImageView({
        layoutData: {top: 0, left: [image2,0], width: picWidth, height: 100},
        scaleMode: "fill",
        opacity: 0.3
      }).appendTo(cell);*/

      var desc = new tabris.TextView({
        layoutData: {left: "5%", top: [title,10], right: "5%"},
        alignment: "left"
      }).appendTo(cell);
      var line = new tabris.Composite({
  		layoutData: {left: 0, bottom: 0, height: 1, right: 0},
  		background: "#cccccc"
      }).appendTo(cell);
      cell.on("change:item", function(widget, quiz) {
        image.set("image", {src: quiz.img[0]});
        //image2.set("image", {src: quiz.img[1]});
        //image3.set("image", {src: quiz.img[2]});
        title.set("text", quiz.title);
        desc.set("text", quiz.desc);
      });
    }
  });
}

module.exports = list;