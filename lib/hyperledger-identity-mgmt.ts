import { AdminConnection } from 'composer-admin';
import { BusinessNetworkConnection } from 'composer-client';
import { NetworkCardStoreManager, IdCard } from 'composer-common';
import * as config from 'config';

class IdentityManager {
	cardStore: NetworkCardStoreManager = NetworkCardStoreManager.getCardStore();
	adminCard = config.get('adminCard');
	namespace = config.get('namespace');
	businessNetworkConnection: BusinessNetworkConnection = new BusinessNetworkConnection({ cardStore: this.cardStore });
	adminConnection: AdminConnection = new AdminConnection();

	async issueIdentity() {
		try {
			await this.businessNetworkConnection.connect(this.adminCard);
			// Get the factory for the business network.
			let factory = this.businessNetworkConnection.getBusinessNetwork().getFactory();
			// Create the participants, Provide unique entries only
			let id = `${Math.floor(Math.random()*90000) + 10000}`;
			let participant = factory.newResource(this.namespace, 'SampleParticipant', id);
			participant.firstName = "test";
			participant.lastName = "test";
	
			let participantRegistry = await this.businessNetworkConnection.getParticipantRegistry(this.namespace + '.SampleParticipant');
			await participantRegistry.add(participant);
				
			return await this.businessNetworkConnection.issueIdentity(this.namespace + '.SampleParticipant#'+ id, id);
		} catch (err) {
			return err;
		} 
	}

	async importCardForIdentity(cardName, identity) {
		let connectionProfile = config;
		connectionProfile.name = config.get('name');

		const metadata = {
			userName: identity.userID,
			version: 1,
			enrollmentSecret: identity.userSecret,
			businessNetwork: config.get('businessNetwork')
		};

		const card = new IdCard(metadata, connectionProfile);
		return await this.adminConnection.importCard(cardName, card);
	}

	async useIdentity(cardName) {
		await this.businessNetworkConnection.disconnect();
	
		await this.businessNetworkConnection.connect(cardName);
		let result = await this.businessNetworkConnection.ping();
		console.log(`participant = ${result.participant ? result.participant : '<no participant found>'}`);
	}
}

export default IdentityManager;