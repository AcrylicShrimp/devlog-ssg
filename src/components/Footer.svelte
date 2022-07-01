<script>
	import envelopeSvg from '@fortawesome/fontawesome-free/svgs/regular/envelope.svg';
	import githubSvg from '@fortawesome/fontawesome-free/svgs/brands/github.svg';
	import twitterSvg from '@fortawesome/fontawesome-free/svgs/brands/twitter.svg';
</script>

<style global lang="postcss">
	@import '../styles/footer.css';
</style>

<footer class="px-2 sm:px-8 flex flex-col justify-start items-start space-y-2 text-wine">
	<p class="text-lg text-gray">AcrylicShrimp</p>
	<div class="pl-2 sm:pl-4 flex flex-col sm:flex-row justify-start item-center text-base">
		<div class="flex flex-col justify-start item-start">
			<p>
				{@html envelopeSvg}
				<a class="hover:underline" href="mailto:led789zxpp@naver.com" target="_blank" rel="noopener noreferrer"
					>led789zxpp@naver.com</a>
			</p>
			<p class="mt-1">
				{@html envelopeSvg}
				<a class="hover:underline" href="mailto:phyenjun@gmail.com" target="_blank" rel="noopener noreferrer"
					>phyenjun@gmail.com</a>
			</p>
		</div>
		<div class="mt-8 sm:mt-0 sm:ml-16 flex flex-col justify-start item-start">
			<p>
				{@html githubSvg}
				<a class="hover:underline" href="https://github.com/AcrylicShrimp" target="_blank" rel="noopener noreferrer"
					>AcrylicShrimp</a>
			</p>
			<p class="mt-1">
				{@html twitterSvg}
				<a class="hover:underline" href="https://twitter.com/AcrylicShrimp" target="_blank" rel="noopener noreferrer"
					>AcrylicShrimp</a>
			</p>
		</div>
	</div>
</footer>
