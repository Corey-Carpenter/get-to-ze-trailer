;(function(window, $){
    "use strict";
  
    var defaultConfig = {
      type: '',
      autoDismiss: false,
      container: '#toasts',
      autoDismissDelay: 4000,
      transitionDuration: 500
    };
  
    $.toast = function(config){
      var size = arguments.length;
      var isString = typeof(config) === 'string';
      
      if(isString && size === 1){
        config = {
          message: config
        };
      }
  
      if(isString && size === 2){
        config = {
          message: arguments[1],
          type: arguments[0]
        };
      }
      
      return new toast(config);
    };
  
    var toast = function(config){
      config = $.extend({}, defaultConfig, config);
      // show "x" or not
      var close = config.autoDismiss ? '' : '&times;';
      
      // toast template
      var toast = $([
        '<div class="toast ' + config.type + '">',
        '<p>' + config.message + '</p>',
        '<div class="close">' + close + '</div>',
        '</div>'
      ].join(''));
      
      // handle dismiss
      toast.find('.close').on('click', function(){
        var toast = $(this).parent();
  
        toast.addClass('hide');
  
        setTimeout(function(){
          toast.remove();
        }, config.transitionDuration);
      });
      
      // append toast to toasts container
      $(config.container).append(toast);
      
      // transition in
      setTimeout(function(){
        toast.addClass('show');
      }, config.transitionDuration);
  
      // if auto-dismiss, start counting
      if(config.autoDismiss){
        setTimeout(function(){
          toast.find('.close').click();
        }, config.autoDismissDelay);
      }
  
      return this;
    };
    
  })(window, jQuery);
  
  /* ---- start demo code ---- */
  
  var count = 1;
  var types = ['default', 'error', 'warning', 'info'];
  
  $('button').click(function(){
    var data = this.dataset;
  
    switch(data.type){
     
      case 'auto':
        $.toast({
          autoDismiss: true,
          message: 'Your report have been submitted sucessfully',

        });
  
        break;
        
      default:
         $.toast('Hello there!');
    }
  });
  
  
  /* ---- end demo code ---- */