import { DefaultOperationParser, OperationContext } from '@devlikeapro/n8n-openapi-node';
import { OpenAPIV3 } from 'openapi-types';

export default class QonektoOperationParser extends DefaultOperationParser {
	name(operation: OpenAPIV3.OperationObject, context: OperationContext): string {
		if (operation.operationId === 'lnder') {
			return 'Länder';
		}
		return super.name(operation, context);
	}

	shouldSkip(operation: OpenAPIV3.OperationObject, context: OperationContext): boolean {
		if (
			operation.operationId === 'addArchiveintrag' ||
			operation.operationId === 'triggerPipelineImportFromCRM'
		) {
			return true;
		}

		return super.shouldSkip(operation, context);
	}
}
