var leftBody = $(".left-body");
var bar = $(".bar");
var leftBodyContent = leftBody.children();
console.log(leftBodyContent);
for (var i = 0; i < leftBodyContent.length; i++) {
    leftBodyContent[i].index = i;
    leftBodyContent.click(function() {
        $(this).addClass("clickColor").siblings().removeClass("clickColor");
        bar.animate({ top: this.index * 47 }, 100);

    })
}
$(".img-line").click(function() {
    $("#left").toggleClass("toggled");
    $("#right").toggleClass("toggled");
});
$('.nav-tabs a').click(function(e) {
    e.preventDefault()
    $(this).tab('show')
})