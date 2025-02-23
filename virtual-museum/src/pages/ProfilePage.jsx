import React from "react";
import BADGES from "../../data/badges";
import userIcon from "../assets/user-icon-2.jpg";

export default function ProfilePage() {
    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    {/* User Profile Section */}
                    <div className="mb-4">
                        <div className="text-center">
                            <img 
                                src={userIcon} 
                                alt="User Profile" 
                                className="rounded-circle mb-3"
                                width="150"
                                height="150"
                            />
                            <h2 className="fw-bold">John Doe</h2>
                        </div>
                    </div>

                    {/* Badges Achieved Section with Alert */}
                    <div className="alert alert-warning text-center shadow-lg">
                        <h4 className="fw-bold">🏆 Badges Achieved</h4>
                        <p className="mb-3">Congratulations! You've earned these badges.</p>
                        <div className="d-flex flex-wrap justify-content-center">
                            {BADGES.length > 0 ? (
                                BADGES.map((badge) => (
                                    <div key={badge.id} className="text-center m-3">
                                        <i className={`bi ${badge.icon} text-warning`} style={{ fontSize: "2rem" }}></i>
                                        <p className="fw-bold mt-1">{badge.name}</p>
                                    </div>
                                ))
                            ) : (
                                <p className="text-muted text-center">No badges earned yet.</p>
                            )}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}