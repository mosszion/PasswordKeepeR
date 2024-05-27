-- Users seeds
INSERT INTO users (username, email, password, organization_id) VALUES ('john_doe', 'john@example.com', 'password', 1);
INSERT INTO users (username, email, password, organization_id) VALUES ('alice_smith', 'alice@example.com', 'password', 2);
INSERT INTO users (username, email, password, organization_id) VALUES ('bob_jones', 'bob@example.com', 'password', 3);
INSERT INTO users (username, email, password, organization_id) VALUES ('emma_davis', 'emma@example.com', 'password', 4);
INSERT INTO users (username, email, password, organization_id) VALUES ('sam_wilson', 'sam@example.com', 'password', 5);

-- Ogranizations admin
INSERT INTO organizations (organization_name, description, admin_id) VALUES ('TechCorp', 'Tech company specializing in software development.', 1);
INSERT INTO organizations (organization_name, description, admin_id) VALUES ('Health Solutions', 'Healthcare organization providing medical services.', 2);
INSERT INTO organizations (organization_name, description, admin_id) VALUES ('Education Institute', 'Educational institution offering courses and programs.', 3);
INSERT INTO organizations (organization_name, description, admin_id) VALUES ('Marketing Agency', 'Marketing firm offering advertising and branding services.', 4);
INSERT INTO organizations (organization_name, description, admin_id) VALUES ('Consulting Firm', 'Consultancy providing business advisory services.', 5);

-- Accounts seeds
INSERT INTO accounts (account_name, username, password, website_url, description, organization_id) VALUES ('Google', 'google_user', 'googlepass123', 'https://www.google.com', 'Account for accessing Google services.', 1);
INSERT INTO accounts (account_name, username, password, website_url, description, organization_id) VALUES ('Facebook', 'fb_user', 'fbpass456', 'https://www.facebook.com', 'Account for social media platform Facebook.', 2);
INSERT INTO accounts (account_name, username, password, website_url, description, organization_id) VALUES ('Amazon', 'amazon_user', 'amazonpass789', 'https://www.amazon.com', 'Account for online retail giant Amazon.', 3);
INSERT INTO accounts (account_name, username, password, website_url, description, organization_id) VALUES ('LinkedIn', 'linkedin_user', 'linkedinpass321', 'https://www.linkedin.com', 'Account for professional networking site LinkedIn.', 4);
INSERT INTO accounts (account_name, username, password, website_url, description, organization_id) VALUES ('Twitter', 'twitter_user', 'twitterpass654', 'https://www.twitter.com', 'Account for microblogging platform Twitter.', 5);