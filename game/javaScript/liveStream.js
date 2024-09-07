Macro.add('streamscreen', {
    tags: null,
    handler: function() {
        console.log("output是" + this.output);
        console.log("contents是" + this.payload[0].contents);
        $(this.output).wiki('<main class="streamscreen">' + this.payload[0].contents + '</main>');
    }
});