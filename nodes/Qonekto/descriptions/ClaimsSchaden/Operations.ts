import { INodeProperties } from 'n8n-workflow';

export const ClaimsSchaden: INodeProperties[] = [
  {
    "displayName": "Operation",
    "name": "operation",
    "type": "options",
    "noDataExpression": true,
    "displayOptions": {
      "show": {
        "resource": [
          "Claims Schaden"
        ]
      }
    },
    "options": [
      {
        "name": "List Claims By Contract",
        "value": "List Claims By Contract",
        "action": "List Claims by Contract",
        "description": "List Claims by Contract",
        "routing": {
          "request": {
            "method": "GET",
            "url": "=/vertrag/{{$parameter[\"vertrag_ameise_id\"]}}/schaden"
          }
        }
      },
      {
        "name": "Create Claim",
        "value": "Create Claim",
        "action": "Create Claim",
        "description": "Create Claim",
        "routing": {
          "request": {
            "method": "POST",
            "url": "=/vertrag/{{$parameter[\"vertrag_ameise_id\"]}}/schaden"
          }
        }
      },
      {
        "name": "List Claims By Customer",
        "value": "List Claims By Customer",
        "action": "List Claims by Customer",
        "description": "List Claims by Customer",
        "routing": {
          "request": {
            "method": "GET",
            "url": "=/kunde/{{$parameter[\"kunde_ameise_id\"]}}/schaden"
          }
        }
      },
      {
        "name": "Get Claim Statuses",
        "value": "Get Claim Statuses",
        "action": "Get Claim Statuses",
        "description": "Get Claim Statuses",
        "routing": {
          "request": {
            "method": "GET",
            "url": "=/schaden/statuses"
          }
        }
      },
      {
        "name": "Get Claim",
        "value": "Get Claim",
        "action": "Get Claim",
        "description": "Get Claim",
        "routing": {
          "request": {
            "method": "GET",
            "url": "=/schaden/{{$parameter[\"claimId\"]}}"
          }
        }
      },
      {
        "name": "Update Claim",
        "value": "Update Claim",
        "action": "Update Claim",
        "description": "Update Claim",
        "routing": {
          "request": {
            "method": "PUT",
            "url": "=/schaden/{{$parameter[\"claimId\"]}}"
          }
        }
      },
      {
        "name": "Delete Claim",
        "value": "Delete Claim",
        "action": "Delete Claim",
        "description": "Delete Claim",
        "routing": {
          "request": {
            "method": "DELETE",
            "url": "=/schaden/{{$parameter[\"claimId\"]}}"
          }
        }
      }
    ],
    "default": ""
  }
];

export default ClaimsSchaden;
