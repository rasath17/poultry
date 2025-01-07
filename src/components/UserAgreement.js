import React from 'react';
import { Container, Card, Button } from 'react-bootstrap';

const UserAgreement = () => {
    return (
        <Container className="mt-5">
            <Card className="shadow-lg border-0">
                <Card.Body className="p-5" style={{ backgroundColor: '#f9fafb', color: '#343a40' }}>
                    <h2 className="text-center mb-4" style={{ color: '#0d6efd', fontWeight: 'bold' }}>
                        User Agreement & Disclaimer
                    </h2>
                    <p className="text-muted text-center mb-5">
                        Welcome to <strong style={{ color: '#0d6efd' }}>Egg Farm 365</strong>! Please review our terms and conditions carefully.
                    </p>

                    <ol style={{ lineHeight: '1.8', fontSize: '1.1rem' }}>
                        <li>
                            <strong>Data Entry Responsibility:</strong> Users are solely responsible for the accuracy and completeness of the data they enter on the Egg Farm 365 platform. Please review all information carefully before submission.
                        </li>
                        <li>
                            <strong>Data Storage and Deletion:</strong> While we strive to maintain a secure and reliable database, Egg Farm 365 does not guarantee indefinite retention of your data. Data loss may occur due to technical issues.
                        </li>
                        <li>
                            <strong>Backup and Record Keeping:</strong> Users are encouraged to keep their own backups or records of critical information submitted through the platform.
                        </li>
                        <li>
                            <strong>No Liability for Data Deletion:</strong> Egg Farm 365 shall not be held responsible for any data loss resulting from database errors, accidental deletion, or other technical failures.
                        </li>
                        <li>
                            <strong>Platform Updates and Modifications:</strong> Egg Farm 365 reserves the right to update or modify the platform, including its features, functionality, and database, without prior notice.
                        </li>
                        <li>
                            <strong>Acceptance of Terms:</strong> By accessing and using Egg Farm 365, you acknowledge and accept these terms. If you do not agree with any part of this disclaimer, please refrain from using the platform.
                        </li>
                    </ol>

                    <div className="text-center mt-5">
                        <Button
                            variant="primary"
                            href="/"
                            className="px-5 py-2"
                            style={{ fontSize: '1rem', borderRadius: '30px' }}
                        >
                            Back to Home
                        </Button>
                    </div>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default UserAgreement;
