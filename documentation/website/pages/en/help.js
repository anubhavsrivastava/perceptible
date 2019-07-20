/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require('react');

const CompLibrary = require('../../core/CompLibrary.js');

const Container = CompLibrary.Container;
const GridBlock = CompLibrary.GridBlock;

function Help(props) {
	const { config: siteConfig, language = '' } = props;
	const { baseUrl, docsUrl } = siteConfig;
	const docsPart = `${docsUrl ? `${docsUrl}/` : ''}`;
	const langPart = `${language ? `${language}/` : ''}`;
	const docUrl = doc => `${baseUrl}${docsPart}${langPart}${doc}`;

	const supportLinks = [
		{
			content: `Learn more using the [documentation on this site.](${docUrl('main')})`,
			title: 'Browse Docs'
		},
		{
			content: `Star on [Github](${siteConfig.repoUrl}) to express it`,
			title: 'Like the project'
		},
		{
			content: `Open a [Pull Request](${siteConfig.repoUrl}/pulls) on the Repo`,
			title: 'Suggestions/Improvement/Feedback'
		}
	];

	return (
		<div className="docMainWrapper wrapper">
			<Container className="mainContainer documentContainer postContainer">
				<div className="post">
					<header className="postHeader">
						<h1>Need help?</h1>
					</header>
					<p>
						This project is maintained by -<a href="https://github.com/anubhavsrivastava"> Anubhav</a>
					</p>
					<p> You can reach out on any social platform</p>
					<GridBlock contents={supportLinks} layout="threeColumn" />
				</div>
			</Container>
		</div>
	);
}

module.exports = Help;
