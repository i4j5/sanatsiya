(function($) {
  $.fn.extend({
    openModal: function() {
      $(this).addClass('modal_visible');
      $('body').addClass('modal-open');

      $(this).on('click', function(event){
        if( $(event.target).is('.modal__close') || $(event.target).is('.modal__wrapper') ) {
          event.preventDefault();
          $(this).closeModal();
        }
      });
    }
  });

  $.fn.extend({
    closeModal: function() {
      $(this).removeClass('modal_visible');
      $('body').removeClass('modal-open');
    }
  });

})(jQuery);



$(document).ready(()=>{

	let yatarget = 'order'

	$('.callme').click(function(event) {
		yatarget = 'callme'
		$('#modal__callme').openModal()
	})

	$('.order').click(function(event) {
		yatarget = 'order'
		$('#modal__order').openModal()
	})

	$('.zoom').click(function(event) {
		let img = $(this).data('img');
		$('#zoom__img').attr('src', 'img/' + img);
		$('#modal__zoom').openModal()
	})

	$('.triggers').waypoint(function() {
		$('.triggers__items').addClass('animated flipInX finish-animate')
	}, {offset: '90%'})

	$('#doc').waypoint(function() {
		$('#doc .l').addClass('animated fadeInLeft finish-animate')
		$('#doc .r').addClass('animated fadeInRight finish-animate')
	}, {offset: '90%'})

	$('#scheme').waypoint(function() {
		$('.scheme__item_step_1, .scheme__item_step_3, .scheme__item_step_5').addClass('animated zoomInLeft finish-animate')
		$('.scheme__item_step_2, .scheme__item_step_4, .scheme__item_step_6').addClass('animated zoomInRight finish-animate')
	}, {offset: '90%'})

	$('.logos').waypoint(function() {
		$('.logos img').addClass('animated zoomIn')
		
	}, {offset: '90%'})


	let $items = $('.tabs__item')
	$items.each((index, el) => {
		let $el = $(el)
		$el.children('.tabs__title').click(function(event) {
			$el.toggleClass('tabs__item_active')

			let $progressBar = $el.children('.tabs__text').children('.progress-bar')
			let interest = $progressBar.data('interest')

			
			if ( $el.hasClass('tabs__item_active') ) {
				$progressBar.children('.progress-bar__pace').children('.progress-bar__interest').text('')
				$progressBar.children('.progress-bar__pace').width('0%')
				$el.children('.tabs__text').slideDown(500)
				setTimeout(() => {
					$progressBar.children('.progress-bar__pace').width(interest + '%')
					let n = 0
					let timerId = setInterval(() => {
						++n
						$progressBar.children('.progress-bar__pace').children('.progress-bar__interest').text(n + '%')
						// $progressBar.children('.progress-bar__pace').width(n + '%')
					}, 1000 / interest)

					setTimeout(() => {
						clearInterval(timerId)
					},1000)
				}, 500)
			} else {
				$el.children('.tabs__text').slideUp(500)
				setTimeout(() => {
					$progressBar.children('.progress-bar__pace').width('0%')
				}, 500)
			}
		});	
	})


	$('.ajax').each(function(){
	    $(this).validate({
	      unhighlight: function (element, errorClass) {
	        $(element).addClass('input_ok').removeClass('input_error');
	      },
	      submitHandler: function(form, e) {
	        e.preventDefault()

	        $('.loader_submit').addClass('loader_active')

	        var form = $(form),
	        str = form.serialize()

	        let btn = form.children("[type='submit']")
	        //let btnText = btn.val()
	        //btn.val('Обработка...')
	        btn.prop('disabled',true)

	        let download = form.children("[name='download']").val()

	        $.ajax({
	          url: 'http://lp.bk-invent.ru/send.php',
	          type: 'post',
	          data: str
	        })
	        .done(function() {
	           $('.modal').closeModal()
	           
	           if (download) {
	           		yatarget = 'doc'
           			$('#modal__download').openModal()
	           } else {
           			$('#modal__ok').openModal()
	           }
	           yaCounter51570953.reachGoal(yatarget)
	           yatarget = 'order'
	        })
	        .always(function() {
			   //btn.val(btnText)
			   $('.loader_submit').removeClass('loader_active')
	           btn.prop('disabled',false)
	        })

	      },
	      rules: {
	        'phone': {
	          required: true,
	        },
	        'name': {
	          required: true
	        },
	      },
	      errorPlacement: function(error, element){
	        $(element).addClass('input_error').removeClass('input_ok');
	      }
	    });//validate
  	});//ajax


	ymaps.ready(init);
	var map;

	function init(){
	  map = new ymaps.Map("map", {
	      center: [47.229409, 39.678002],
	      zoom: 17,
	     controls: [
	      'zoomControl'
	     ]
	  });

	  map.behaviors.disable(['scrollZoom']);

	  var placemark = new ymaps.Placemark([47.229409, 39.678002],
	    {
	      hintContent: 'БК Инвент ул. Текучева, 23, эт. 3'
	      //balloonContent: 'html'
	    }, 
	    {
	      iconLayout: 'default#image',
	      iconImageHref: './img/maps.png',
	      iconImageSize: [90, 108],
	      iconImageOffset: [-38, -110]
	    }
	  );

	  map.geoObjects.add(placemark);
	}


})

// $(document).ready(function(){
//   $('.slider').bxSlider({
//   	pager: true,
//   	nextText: '',
//   	prevText: '',
//   	touchEnabled: false,
//   	auto: true,
//   	pause: 2800,
//   	stopAutoOnClick: true,
//   	autoHover: true
//   });
// });

$(window).on('load', e => {
	window.setTimeout(function() {
		$('.loader').removeClass('loader_active')
		$('.offer__text').addClass('animated bounceInLeft finish-animate')
		$('.offer__action').addClass('animated bounceInRight finish-animate')
	}, 100);   
})