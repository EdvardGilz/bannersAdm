/*
 * Arreglos jQuery, exclusivos para caracterísitcas del tema
 */

	jQuery(document).ready(function($){
		
			
		// Sidebar izquierdo mostrar ocultar
			$("#show-sidebar-left").on('click',function(e) {
			        e.preventDefault();
			        $("#content").toggleClass("active-sidebar-left");
			});		
			
		// Botón Animado
			
			$(".c-hamburger").on('click',function(e) {
		        e.preventDefault();
		        $(this).toggleClass("is-active");
			});
			          
	}); //fin JQuery()…
	
	
	
	
/* Extravagancias ñ_ñ */	
	
// Obtener la fecha y ponerla en el copyright (footer)
	
	var year = new Date().getFullYear();	
	var div = document.getElementById('copyDate');
	div.innerHTML = div.innerHTML + year;
	
	
/* Darle formato de bootstrap a los <inputs> de carga de archivos
 * fuente: https://www.abeautifulsite.net/whipping-file-inputs-into-shape-with-bootstrap-3
 */
	
	function btnCargaArchivo(){

		  // We can attach the `fileselect` event to all file inputs on the page
		  $(document).on('change', ':file', function() {
		    var input = $(this),
		        numFiles = input.get(0).files ? input.get(0).files.length : 1,
		        label = input.val().replace(/\\/g, '/').replace(/.*\//, '');
		    input.trigger('fileselect', [numFiles, label]);
		  });

		  // We can watch for our custom `fileselect` event like this
		  $(document).ready( function() {
		      $(':file').on('fileselect', function(event, numFiles, label) {
				
		          var input = $(this).parents('.input-group').find(':text'),
		              log = numFiles > 1 ? numFiles + ' files selected' : label;

		          if( input.length ) {
		              input.val(log);
		          } else {
		              if( log ) alert(log);
		          }

		      });
		  });
		  
	}
	
	
	function previewBanner(){
        var idBanner = makeid();
		/* Preview en vivo para la seleccion del tamaño */   
		    
        $('#prevTamano').change(function(){
        	getData(idBanner);
        }).change(); 

		$(".inputData").on('input', function() {
			getData(idBanner);
		});

		// BOTON PUBLICAR
		$("#publicar").on('click', function(e) {
			// e.preventDefault();
			console.log($('#prevTamano').find('option:selected').data('width'));
			/** BLOQUE DE DATOS */
			var data = {"nombre": $("#nombreBanner").val(),
						"campania": $("#campañaBanner").val(),
						"cliente": $("#clienteBanner").val(),
						"proveedores": $("#proveedoresBanner").val(),
						"impresiones": $("#impresionesBanner").val(),
						"clics": $("#clicsBanner").val(),
						"inicioF": $("#inicioFBanner").val(),
						"inicioH": $("#inicioHBanner").val(),
						"finF": $("#finFBanner").val(),
						"finH": $("#finHBanner").val(),
						"url": $("#prevUrl").val(),
						"titulo": $("#prevTxt1").val(),
						"mensaje": $("#prevTxt2").val(),
						"txtc": $("#prevColor").val(),
						"bgc": $("#prevBGcolor").val(),
						"id": idBanner,
						"width": $('#prevTamano').find('option:selected').data('width'),
						"height": $('#prevTamano').find('option:selected').data('height')}
			/** BLOQUE DE DATOS */
			$.post( "api/emuladorApi.php", data, function(data) {
				console.log(data);
				if (data == 1) {
					alert("Banner creado correctamente, id: " + idBanner);
				}
				else {
					alert("Ocurrio un error, intentalo de nuevo");
				}
			});
		});
	}

	function getData(idBanner) {
		// buscame el valor seleccionado data-width y data-height
		var selected = $('#prevTamano').find('option:selected');
		var banWidth = selected.data('width'); 
		var banHeight = selected.data('height'); 
		
		//al encontrarlo modifica el banner preview
		$('#previewBanner').css({ 
			"width" : banWidth,
			"height" : banHeight
		});

		$('#previewCode').empty();

		/** BLOQUE DE DATOS
		 * HACER AQUI LA VALIDACION
		 */
		var nombre = $("#nombreBanner").val();
		var campaña = $("#campañaBanner").val();
		var cliente = $("#clienteBanner").val();
		var proveedores = $("#proveedoresBanner").val();
		var impresiones = $("#impresionesBanner").val();
		var clics = $("#clicsBanner").val();
		var inicioF = $("#inicioFBanner").val();
		var inicioH = $("#inicioHBanner").val();
		var finF = $("#finFBanner").val();
		var finH = $("#finHBanner").val();

		var url = $("#prevUrl").val();
		var titulo = $("#prevTxt1").val();
		var mensaje = $("#prevTxt2").val();
		var txtc = $("#prevColor").val();
		var bgc = $("#prevBGcolor").val();
		
		var id = idBanner;
		/** BLOQUE DE DATOS */
		
		var html = "<h3>" + titulo + "</h3>" + "<p>" + mensaje + "</p>";  

		$('#previewBanner').wrap( '<a href="'+ url +'" target="_blank"></a>' );
		$('#previewBanner').html( html );
		$('#previewBanner').css({
			"color" : txtc ,
			"background-color" : bgc,
			"padding" : "5px"
		});
		
		$('#previewCode').append( '<p>Distribuir código</p>' );
		// $('#previewCode').append( '<textarea class="form-control"> &lt;a class="bixnia-banner" href="https://bixnia.com/banner/id?text='+txtm+'?url='+url+'"&gt; banner &lt;/a&gt; </textarea>' );
		$('#previewCode').append( '<textarea class="form-control">&lt;div id="' + id + '" class="bixnia-banner" &gt;  &lt;/div&gt;  </textarea>' );
	}

	function makeid(){
		var text = "";
		var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

		for( var i=0; i < 10; i++ )
			text += possible.charAt(Math.floor(Math.random() * possible.length));

		return text;
	}
	