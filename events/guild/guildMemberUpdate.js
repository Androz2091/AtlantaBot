module.exports = class {

	constructor (client) {
		this.client = client;
	}
  
	async run (oldMember, newMember) {
		if(oldMember.guild.id !== this.client.config.support.id) return;
		if(oldMember.roles.cache.some((r) => r.name === "【💳】Donators")) return;
		if(newMember.roles.cache.some((r) => r.name === "【💳】Donators")){
			const userData = await this.client.findOrCreateUser({ id: newMember.id });
			userData.achievements.tip.progress.now = 1;
			userData.achievements.tip.achieved = true;
			userData.markModified("achievements.tip");
			await userData.save();
			newMember.send({ files: [ { name: "unlocked.png", attachment: "./assets/img/achievements/achievement_unlocked5.png"} ] });
		}
	}
};