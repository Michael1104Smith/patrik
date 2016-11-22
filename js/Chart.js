var Chart = (function() {
    // "private" variables 
    var id, width, height, x, y, count, value, conversion, conversionChange, heightRate, color, bigRectY;
    var rectY;
    var title;
    var start_count, start_value, start_conversion, start_conversionChange;
    var end_count, end_value, end_conversion, end_conversionChange;
    var chart_flag, manCnt;
    var count_ind, per_count;
    var end_flag;
    var per_rectHeight, rectHeight, rectHeight_ind;
    var paddingTop, lineHeight;

    // constructor
    function Chart() {
      this.chart_flag = 0;
      this.manCnt = 0;
      this.count_ind = 0;
      this.end_flag = 0;
      this.rectHeight_ind = 0;
    };

    // add the methods to the prototype so that all of the 
    // Foo instances can access the private static

    Chart.prototype.draw = function() {
        var id = this.id;
        var g = d3.select(id);
        g.html('');
        var bigFontSize = parseInt($('.bigFontSize').css('font-size'));
        var x = this.x;
        var width = this.width;
        var height = this.height;
        var offset = 2;
        var circle_r = width/86*2;
        var start_conversion = this.start_conversion;
        var conversionChange = this.end_conversionChange - this.start_conversionChange;
        var manCnt = this.manCnt;
        var count_ind = this.count_ind;
        var per_rectHeight = this.per_rectHeight;
        if(this.chart_flag == 0){
          var color = this.color;
          var paddingTop = this.paddingTop;
          var lineHeight = this.lineHeight;
          var rectY = this.rectY;
          var heightRate = this.heightRate;
          var rectHeight = this.rectHeight;
          var title = this.title;
          var bigRectY = this.bigRectY;
          var start_count = this.start_count;
          var start_value = this.start_value;
          var rectHeight_ind = this.rectHeight_ind;
          // console.log(rectHeight);
          g.append('line')
            .attr('x1', x)
            .attr('y1', paddingTop)
            .attr('x2', x)
            .attr('y2', height - paddingTop)
            .attr('class','middlerectcolor');

          var str = x+","+rectY+" "
                    +(x+width-offset)+","+(rectY+height*heightRate)+" "
                    +(x+width-offset)+","+(rectY+rectHeight-height*heightRate)+" "
                    +x+","+(rectY+rectHeight);
          g.append('polygon')
            .attr('points',str)
            .attr('class','middlerectcolor');
          var str = x+","+(rectY)+" "
                  +(x+width-offset)+","+(rectY+height*heightRate)+" "
                  +(x+width-offset)+","+(rectY+height*heightRate-rectHeight_ind)+" "
                  +x+","+(rectY-rectHeight_ind);
          var m_color = colorArr[0];
          var dot_color = "white";
          if(rectHeight_ind < 0){
            m_color = colorArr[4];
            dot_color = colorArr[5];
          }
          var dot_rate = width/40;
          if(per_rectHeight != 0){
            var plusrect = 0;
            if(rectHeight_ind < 0){
                plusrect = rectHeight_ind;
            }
            g.append('line')
              .attr('x1', x)
              .attr('y1', rectY-plusrect)
              .attr('x2', x+width-offset)
              .attr('y2', rectY+height*heightRate-plusrect)
              .attr('stroke',dot_color)
              .attr('stroke-width',2)
              .attr('class','updot')
              .style("stroke-dasharray", dot_rate+", "+dot_rate);
            g.append('line')
              .attr('x1', x)
              .attr('y1', rectY+rectHeight+plusrect)
              .attr('x2', x+width-offset)
              .attr('y2', rectY+rectHeight-height*heightRate+plusrect)
              .attr('stroke',dot_color)
              .attr('stroke-width',2)
              .attr('class','downdot')
              .style("stroke-dasharray", dot_rate+", "+dot_rate);
          }
          if(rectHeight_ind < 0){
            g.append('polygon')
              .attr('points',str)
              .attr('class','uprect uprect1');
          }else{
            g.append('polygon')
              .attr('points',str)
              .attr('class','uprect uprect2');
          }
          var str = x+","+(rectY+rectHeight)+" "
                  +(x+width-offset)+","+(rectY+rectHeight-height*heightRate)+" "
                  +(x+width-offset)+","+(rectY+rectHeight-height*heightRate+rectHeight_ind)+" "
                  +x+","+(rectY+rectHeight+rectHeight_ind);
          if(rectHeight_ind < 0){
            g.append('polygon')
              .attr('points',str)
              .attr('class','downrect downrect1');
          }else{
            g.append('polygon')
              .attr('points',str)
              .attr('class','downrect downrect2');
          }
          var fontSize = bigFontSize;
          g.append("svg:image")
           .attr('x',x+fontSize)
           .attr('y',(paddingTop+bigRectY)/2-fontSize/3*2)
           .attr('width', fontSize/5*4)
           .attr('height', fontSize/5*4)
           .attr("xlink:href","img/"+title+".png");
          g.append('text')
            .attr('x',x+fontSize*11/5)
            .attr('y',(paddingTop+bigRectY)/2)
            .text(title)
            .attr('font-size',fontSize+'px');

          var horizontal_line_width = width/86*22;
          var lineMarginTop = height/160*2;
          g.append('line')
            .attr('x1', x)
            .attr('y1', height/2-lineMarginTop)
            .attr('x2', x+horizontal_line_width)
            .attr('y2', height/2-lineMarginTop)
            .attr('stroke','#fff');

          g.append('circle')
            .attr('cx',x+horizontal_line_width+circle_r)
            .attr('cy',height/2-lineMarginTop)
            .attr('r',circle_r)
            .attr('class','noneFill')
            .attr('stroke','white');

          var fontSize = bigFontSize/24*20;
          var j;
          for(j = 0; j < manCnt; j++){
            var opacity = 1;
            if(j == manCnt - 2){
              opacity = 0.8;
            }else if(j == manCnt - 1){
              opacity = 0.5;
            }
            g.append("svg:image")
             .attr('x',x+horizontal_line_width+circle_r*2+j*fontSize/13*6+circle_r/2)
             .attr('y',height/2-lineMarginTop-fontSize/2*3)
             .attr('width', fontSize/10*7)
             .attr('height', fontSize/5*4)
             .attr("xlink:href",'img/man.png')
             .attr('opacity',opacity);
          }
          g.append('text')
            .attr('x', x+horizontal_line_width+circle_r*3)
            .attr('y', height/2+fontSize/3-lineMarginTop)
            .attr('font-size',fontSize+"px")
            .attr('class','Count whiteFill')
            .text(count_ind);

          lineMarginTop = lineMarginTop*5;
          g.append('line')
            .attr('x1', x)
            .attr('y1', height/2+lineMarginTop)
            .attr('x2', x+horizontal_line_width)
            .attr('y2', height/2+lineMarginTop)
            .attr('stroke','#fff');
          g.append('circle')
            .attr('cx',x+horizontal_line_width+circle_r)
            .attr('cy',height/2+lineMarginTop)
            .attr('r',circle_r)
            .attr('class','noneFill')
            .attr('stroke','white');

          var fontSize = bigFontSize/24*11;
          g.append('text')
            .attr('x', x+horizontal_line_width+circle_r*4)
            .attr('y', height/2+fontSize/3+lineMarginTop)
            .attr('font-size',fontSize+"px")
            .text('$ '+ start_value)
            .attr("class",'whiteFill');

          var paddingBottomLineTop = height/160*7;
          g.append('line')
            .attr('x1', x+circle_r)
            .attr('y1', height-lineMarginTop-paddingBottomLineTop)
            .attr('x2', x+width-circle_r)
            .attr('y2', height-lineMarginTop-paddingBottomLineTop)
            .attr('stroke','black')
            .attr('opacity',0.5);

          fontSize += 2;
          if(per_rectHeight != 0){
            g.append('text')
              .attr('x', x+circle_r*3)
              .attr('y', height-lineMarginTop-paddingBottomLineTop-fontSize)
              .attr('font-size',fontSize+"px")
              .text(start_conversion+"%")
              .attr("class",'blackFill')
              .attr('opacity',0.5);
          }

          fontSize -= 1;

          if(conversionChange != 0){
            var tColor = colorArr[0];
            var imgUrl = "img/up.png";
            if(rectHeight_ind < 0){
              tColor = colorArr[4];
              imgUrl = "img/down.png";
            }

            g.append("svg:image")
             .attr('x',x+width-circle_r*10.5)
             .attr('y',height-lineMarginTop-paddingBottomLineTop-fontSize*2)
             .attr('width', fontSize)
             .attr('height', fontSize/4*5)
             .attr("xlink:href",imgUrl);

            if(rectHeight_ind < 0){
              g.append('text')
                .attr('x', x+width-circle_r*3)
                .attr('y', height-lineMarginTop-paddingBottomLineTop-fontSize)
                .attr('font-size',fontSize+"px")
                .text(conversionChange+"%")
                .attr('class','uprect1')
                .style('text-anchor','end');
            }else{
              g.append('text')
                .attr('x', x+width-circle_r*3)
                .attr('y', height-lineMarginTop-paddingBottomLineTop-fontSize)
                .attr('font-size',fontSize+"px")
                .text(conversionChange+"%")
                .attr('class','uprect2')
                .style('text-anchor','end');
            }
          }
        }else{
          var horizontal_line_width = width/86*22;
          var lineMarginTop = height/160*2;
          g.append('line')
            .attr('x1', x)
            .attr('y1', height/2-lineMarginTop)
            .attr('x2', x+width-offset)
            .attr('y2', height/2-lineMarginTop)
            .attr('stroke','black')
            .attr('opacity',0.5);
          var fontSize = bigFontSize/24*15;
          g.append("svg:image")
           .attr('x',x)
           .attr('y',height/2-lineMarginTop-fontSize/5*7)
           .attr('width', fontSize)
           .attr('height', fontSize/4*5)
           .attr("xlink:href","img/Count.png");
          g.append('text')
            .attr('x', x+fontSize/4*5)
            .attr('y', height/2-lineMarginTop-fontSize/3)
            .attr('font-size',fontSize+"px")
            .text('Count (# people)');

          lineMarginTop = lineMarginTop*5;
          g.append('line')
            .attr('x1', x)
            .attr('y1', height/2+lineMarginTop)
            .attr('x2', x+width-offset)
            .attr('y2', height/2+lineMarginTop)
            .attr('stroke','black')
            .attr('opacity',0.5);

          g.append("svg:image")
           .attr('x',x)
           .attr('y',height/2+lineMarginTop-fontSize/5*7)
           .attr('width', fontSize)
           .attr('height', fontSize/4*5)
           .attr("xlink:href","img/Value.png");
          g.append('text')
            .attr('x', x+fontSize/4*5)
            .attr('y', height/2+lineMarginTop-fontSize/3)
            .attr('font-size',fontSize+"px")
            .text('Values');

          var paddingBottomLineTop = height/160*7;
          g.append('line')
            .attr('x1', x+circle_r)
            .attr('y1', height-lineMarginTop-paddingBottomLineTop)
            .attr('x2', x+width-circle_r)
            .attr('y2', height-lineMarginTop-paddingBottomLineTop)
            .attr('stroke','black')
            .attr('opacity',0.5);

          var fontSize = bigFontSize/24*9;
          fontSize += 2;

          g.append("svg:image")
           .attr('x',x+circle_r)
           .attr('y',height-lineMarginTop-paddingBottomLineTop-fontSize/4*7)
           .attr('width', fontSize)
           .attr('height', fontSize/4*5)
           .attr("xlink:href","img/ConversionRate.png");
          g.append('text')
            .attr('x', x+circle_r*4)
            .attr('y', height-lineMarginTop-paddingBottomLineTop-fontSize/10*9)
            .attr('font-size',fontSize+"px")
            .text('Conversion Rate')
            .attr("class",'blackFill')
            .attr('opacity',0.5);

          fontSize -= 1;

          g.append("svg:image")
           .attr('x',x+width-fontSize*7)
           .attr('y',height-lineMarginTop-paddingBottomLineTop-fontSize/4*7)
           .attr('width', fontSize)
           .attr('height', fontSize/4*5)
           .attr("xlink:href","img/Change.png");
          g.append('text')
            .attr('x', x+width-circle_r)
            .attr('y', height-lineMarginTop-paddingBottomLineTop-fontSize/10*9)
            .attr('font-size',fontSize+"px")
            .text('Change')
            .attr("class",'blackFill')
            .attr('opacity',0.5)
            .style('text-anchor','end');
        }
    }
    Chart.prototype.OnTimer = function() {
      var chart_flag = this.chart_flag;
      if(chart_flag == 0){
        var id = this.id;
        var end_count = this.end_count;
        var g_count = d3.select(id+" .Count");
        g_count.text(this.count_ind);
        if(this.count_ind <= end_count-this.per_count){
          this.count_ind += this.per_count;
        }else{
          this.count_ind = this.end_count;
        }

        var heightRate = this.heightRate;
        var rectY = this.rectY;
        var offset = 2;
        var x = this.x;
        var width = this.width;
        var height = this.height;
        var rectHeight = this.rectHeight;
        var conversionChange = this.end_conversionChange - this.start_conversionChange;

        if(Math.abs(this.rectHeight_ind - rectHeight*conversionChange/100) >= Math.abs(this.per_rectHeight)){
          this.rectHeight_ind += this.per_rectHeight; 
        }else {
            this.rectHeight_ind = rectHeight*conversionChange/100;
            if(Math.abs(this.count_ind - this.end_count)<2){
              this.end_flag = 1;
            }
        }

        var str = x+","+(rectY)+" "
                  +(x+width-offset)+","+(rectY+height*heightRate)+" "
                  +(x+width-offset)+","+(rectY+height*heightRate-this.rectHeight_ind)+" "
                  +x+","+(rectY-this.rectHeight_ind);
        g_uprect = d3.select(id+" .uprect");
        g_uprect.attr('points',str);
        var str = x+","+(rectY+rectHeight)+" "
                  +(x+width-offset)+","+(rectY+rectHeight-height*heightRate)+" "
                  +(x+width-offset)+","+(rectY+rectHeight-height*heightRate+this.rectHeight_ind)+" "
                  +x+","+(rectY+rectHeight+this.rectHeight_ind);
        g_downrect = d3.select(id+" .downrect");
        g_downrect.attr('points',str);

        if(this.rectHeight_ind < 0){
          var g_updot = d3.select(id+" .updot");
          g_updot.attr('x1', x)
            .attr('y1', rectY-this.rectHeight_ind)
            .attr('x2', x+width-offset)
            .attr('y2', rectY+height*heightRate-this.rectHeight_ind);
          var g_downdot = d3.select(id+" .downdot");
          g_downdot.attr('x1', x)
            .attr('y1', rectY+rectHeight+this.rectHeight_ind)
            .attr('x2', x+width-offset)
            .attr('y2', rectY+rectHeight-height*heightRate+this.rectHeight_ind);
        }
      }
    }
    return Chart;
})();