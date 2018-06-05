import React from "react";

const NotificationsMenu = (props) => (
  <li className="dropdown notifications-menu">
    {/* Menu toggle button */}
    <a onClick={props.readAllNotifications} className="dropdown-toggle" data-toggle="dropdown">
      <i className="fa fa-bell-o" />
      {props.notifications.items.length > 0 && (
        <span className="label label-warning">
          {props.notifications.items.filter(n => !n.is_seen).length}
        </span>
      )}
    </a>
    <ul className="dropdown-menu">
      <li className="header">
        You have {props.notifications.items.length} notifications
      </li>
      <li>
        <ul className="menu">
          {props.notifications.items.map(notification => (
            <li
              key={notification.id}
              onClick={
                notification.link && props.redirect
                  ? () =>
                      props.redirect(
                        "/" +
                          notification.link
                            .replace("http://localhost:8000/", "")
                            .replace(
                              "http://coursesource.projektai.nfqakademija.lt/",
                              ""
                            )
                      )
                  : null
              }
            >
              <a
                style={{
                  whiteSpace: "normal",
                  cursor: notification.link ? "pointer" : "normal"
                }}
              >
                <i className="fa fa-users text-aqua" />
                {notification.message}
              </a>
            </li>
          ))}
        </ul>
      </li>
    </ul>
  </li>
);

export default NotificationsMenu;