'use strict';

const {tiers, bans, defCost, maxPoints, rosterPoints, getCost} = require('./tiers');

exports.BattleFormats = {
	points: {
		effectType: 'ValidatorRule',
		name: 'Points',
		desc: ["Gives players 400 of points to spend on Pok&eacute;mon"],
		onValidateTeam: function (team, format) {

			let problems = [];
			let points = maxPoints;

			for (const set of team) {
				let template = this.getTemplate(set.species || set.name);
				const item = this.getItem(set.item);
				let postMegaTemplate = template;
				if (item.megaEvolves === template.species) {
					if (!item.megaStone) throw new Error(`Item ${item.name} has no base form for mega evolution`);
					postMegaTemplate = this.getTemplate(item.megaStone);
				}
				if (['Mega', 'Mega-X', 'Mega-Y'].includes(postMegaTemplate.forme)) {
					template = postMegaTemplate;
				}

				if (bans.includes(template.species)) problems.push(`${template.species} is banned.`);
				points -= getCost(template, item);
			}

			if (points < 0) {
				problems.push(`You have spent ${400 - points}. This is more than the maximum ${maxPoints} points.`);
			}

			if (problems.length !== 0) {
				return problems.join('<br>');
			}
		},
	},
	draftpoints: {
		effectType: 'ValidatorRule',
		name: 'DraftPoints',
		desc: ["Gives players 475 of points to spend on Pok&eacute;mon"],
		onValidateTeam: function (team, format) {

			let problems = [];
			let points = rosterPoints;

			for (const set of team) {
				let template = this.getTemplate(set.species || set.name);
				const item = this.getItem(set.item);
				let postMegaTemplate = template;
				if (item.megaEvolves === template.species) {
					if (!item.megaStone) throw new Error(`Item ${item.name} has no base form for mega evolution`);
					postMegaTemplate = this.getTemplate(item.megaStone);
				}
				if (['Mega', 'Mega-X', 'Mega-Y'].includes(postMegaTemplate.forme)) {
					template = postMegaTemplate;
				}

				if (bans.includes(template.species)) problems.push(`${template.species} is banned.`);
				points -= getCost(template, item);
			}

			if (points < 0) {
				problems.push(`You have spent ${475 - points}. This is more than the maximum ${rosterPoints} points.`);
			}

			if (problems.length !== 0) {
				return problems.join('<br>');
			}
		},
	},
};