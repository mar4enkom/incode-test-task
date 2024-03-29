interface User {
    login: string;
    id: number;
    node_id: string;
    avatar_url: string;
    gravatar_id: string;
    url: string;
    html_url: string;
    followers_url: string;
    following_url: string;
    gists_url: string;
    starred_url: string;
    subscriptions_url: string;
    organizations_url: string;
    repos_url: string;
    events_url: string;
    received_events_url: string;
    type: string;
    site_admin: boolean;
}

interface Label {
    id: number;
    node_id: string;
    url: string;
    name: string;
    color: string;
    default: boolean;
    description: string;
}

interface Issue {
    url: string;
    repository_url: string;
    labels_url: string;
    comments_url: string;
    events_url: string;
    html_url: string;
    id: number;
    node_id: string;
    number: number;
    title: string;
    user: User;
    labels: Label[];
    state: string;
    locked: boolean;
    assignee: null; // Assuming assignee can be null
    assignees: unknown[]; // Assuming assignees can be an array
    milestone: null; // Assuming milestone can be null
    comments: number;
    created_at: string;
    updated_at: string;
    closed_at: string | null; // Assuming closed_at can be null
    author_association: string;
    active_lock_reason: null; // Assuming active_lock_reason can be null
    body: string;
}

export type IssueListResponse = Issue[];
export type RepositoryResponse = {
    id: string;
    name: string;
    html_url: string;
    stargazers_count: number;
    owner: {
        login: "facebook",
        html_url: "https://github.com/facebook",
    }
};
