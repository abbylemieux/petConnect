import { gql } from '@apollo/client';

export const ADD_EVENT = gql`
  mutation AddEvent($summary: String!, $description: String!, $start: String!, $end: String!) {
    addEvent(summary: $summary, description: $description, start: $start, end: $end) {
      id
      summary
      description
      start {
        dateTime
      }
      end {
        dateTime
      }
    }
  }
`;

export const UPDATE_EVENT = gql`
  mutation UpdateEvent($id: ID!, $summary: String!, $description: String!, $start: String!, $end: String!) {
    updateEvent(id: $id, summary: $summary, description: $description, start: $start, end: $end) {
      id
      summary
      description
      start {
        dateTime
      }
      end {
        dateTime
      }
    }
  }
`;

export const DELETE_EVENT = gql`
  mutation DeleteEvent($id: ID!) {
    deleteEvent(id: $id) {
      id
    }
  }
`;