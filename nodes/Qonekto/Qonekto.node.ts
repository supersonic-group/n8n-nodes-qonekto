import { INodeTypeBaseDescription, IVersionedNodeType, VersionedNodeType } from 'n8n-workflow';
import { BASE_DESCRIPTION } from './base/node';
import { v20250926 } from './v20250926/v20250926.node';

export class Qonekto extends VersionedNodeType {
	constructor() {
		const baseDescription: INodeTypeBaseDescription = {
			...BASE_DESCRIPTION,
			defaultVersion: 202502,
		};

		const nodeVersions: IVersionedNodeType['nodeVersions'] = {
			20250926: new v20250926(),
		};

		super(nodeVersions, baseDescription);
	}
}
