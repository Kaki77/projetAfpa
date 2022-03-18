<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" {{$dark_mode ? "class=dark" : ''}}>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Laravel</title>

        <link rel="stylesheet" href="/css/app.css" />
    </head>
    <body>
        <div id="root" class="md:w-4/6 mx-auto min-h-screen dark:bg-slate-700 dark:text-white flex flex-col"></div>
    </body>
    <script>
		window.Laravel = {!! json_encode([
            'csrfToken' => csrf_token(),
        ]) !!};
	</script>
    <script src="/js/app.js"></script>
</html>
