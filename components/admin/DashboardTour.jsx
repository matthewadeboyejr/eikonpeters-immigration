"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { FaQuestionCircle } from "react-icons/fa";
import { driver } from "driver.js";
import "driver.js/dist/driver.css";

export default function DashboardTour() {
  const pathname = usePathname();

  const handleStartTour = () => {
    let steps = [];

    if (pathname === "/admin") {
      steps = [
        {
          element: "#sidebar-nav",
          popover: {
            title: "Sidebar Navigation Menu 🧭",
            description: "Easily navigate through all management panels of Eikon Peters: Blog Posts, PDF Guides, client Leads, and Admin permissions.",
            side: "right",
            align: "start"
          }
        },
        {
          element: "#overview-stats",
          popover: {
            title: "Real-Time Stats Dashboard 📊",
            description: "Here you can monitor the status of the entire database. It displays live counts of your blogs, downloadable resources, captured leads, and registered admins.",
            side: "bottom",
            align: "center"
          }
        },
        {
          element: "#recent-posts-card",
          popover: {
            title: "Recent Blog Posts Card 📝",
            description: "Shows the latest articles drafted by your team. You can click 'View' to search or modify them.",
            side: "top",
            align: "center"
          }
        },
        {
          element: "#recent-leads-card",
          popover: {
            title: "Latest Leads List 📧",
            description: "Lists the most recent prospective clients who downloaded immigration resources. Follow up with them to capture business!",
            side: "top",
            align: "center"
          }
        },
        {
          element: "#header-profile",
          popover: {
            title: "Admin Settings & Profile ⚙️",
            description: "Click here to edit your administrative info, read your account logs, or change your secure login password.",
            side: "left",
            align: "center"
          }
        },
        {
          element: "#tour-trigger",
          popover: {
            title: "Interactive Tour Guide 💡",
            description: "You're all set! If you're ever confused about a page, just click this button. We have customized tutorials on every page in the dashboard.",
            side: "bottom",
            align: "end"
          }
        }
      ];
    } else if (pathname === "/admin/blog") {
      steps = [
        {
          element: "#blog-new-btn",
          popover: {
            title: "Create a Blog Post ✍️",
            description: "Click here to draft and publish a new article. A rich text editor is provided to write professional blog formatting.",
            side: "left",
            align: "center"
          }
        },
        {
          element: "#blog-search-bar",
          popover: {
            title: "Search and Filters 🔍",
            description: "Filter through articles instantly by typing in keywords or titles.",
            side: "bottom",
            align: "start"
          }
        },
        {
          element: "#blog-list-table",
          popover: {
            title: "Manage Articles 📁",
            description: "View published posts, click the pencil to edit, or use the trash icon to remove. Deletions will double-confirm via a modal.",
            side: "top",
            align: "center"
          }
        }
      ];
    } else if (pathname === "/admin/guides") {
      steps = [
        {
          element: "#guide-new-btn",
          popover: {
            title: "Upload PDF Guide 📁",
            description: "Add checklists, roadmaps, or visa handbook PDFs. These resources act as leads magnets on the website.",
            side: "left",
            align: "center"
          }
        },
        {
          element: "#guide-search-bar",
          popover: {
            title: "Search Guides 🔍",
            description: "Quickly locate specific immigration resource documents inside your portal library.",
            side: "bottom",
            align: "start"
          }
        },
        {
          element: "#guide-list-table",
          popover: {
            title: "Track Resources 📑",
            description: "Check the number of pages, file size, and target categories. You can edit guides or delete old versions safely.",
            side: "top",
            align: "center"
          }
        }
      ];
    } else if (pathname === "/admin/leads") {
      steps = [
        {
          element: "#leads-export-btn",
          popover: {
            title: "Export Pipeline 📥",
            description: "Download all captured prospective client contacts as a CSV spreadsheet file for direct CRM usage.",
            side: "left",
            align: "center"
          }
        },
        {
          element: "#leads-search-bar",
          popover: {
            title: "Search Contacts 🔎",
            description: "Search contact details by name or email address, or filter records based on status levels.",
            side: "bottom",
            align: "start"
          }
        },
        {
          element: "#leads-list-table",
          popover: {
            title: "Manage Lead Actions ✉️",
            description: "See what resources they downloaded. You can email them directly by clicking the envelope or delete stale contacts.",
            side: "top",
            align: "center"
          }
        }
      ];
    } else if (pathname === "/admin/admins") {
      steps = [
        {
          element: "#preapprove-email-btn",
          popover: {
            title: "Authorize Colleagues 🤝",
            description: "Super Admins can whitelist new email addresses. Only pre-authorized staff emails can sign up to log into this panel.",
            side: "left",
            align: "center"
          }
        },
        {
          element: "#admins-tabs",
          popover: {
            title: "Admins vs Pending 👥",
            description: "Toggle to view registered active administrators or check pre-approved emails that haven't signed up yet.",
            side: "bottom",
            align: "start"
          }
        }
      ];
    } else if (pathname === "/admin/profile") {
      steps = [
        {
          element: "#profile-status-card",
          popover: {
            title: "Account Status 🔐",
            description: "Review your verified login details, role clearance level, and basic account attributes.",
            side: "right",
            align: "center"
          }
        },
        {
          element: "#profile-general-card",
          popover: {
            title: "General Information Form 👤",
            description: "Edit your display name, public bio, and email address. Remember to click 'Save Changes' to commit.",
            side: "top",
            align: "center"
          }
        },
        {
          element: "#profile-security-card",
          popover: {
            title: "Reset Security Password 🔑",
            description: "Update your dashboard password immediately for account safety. It must be at least 6 characters.",
            side: "top",
            align: "center"
          }
        }
      ];
    } else {
      steps = [
        {
          element: "#sidebar-nav",
          popover: {
            title: "Admin Navigation 🧭",
            description: "Use this navigation sidebar to explore other sections of the dashboard, including Blog Management, downloadable resources, client leads, and settings.",
            side: "right",
            align: "center"
          }
        }
      ];
    }

    const driverObj = driver({
      showProgress: true,
      animate: true,
      stagePadding: 8,
      allowClose: true,
      overlayColor: "rgba(15, 23, 42, 0.7)",
      steps: steps,
      nextBtnText: "Next →",
      prevBtnText: "← Back",
      doneBtnText: "Finish 🎉",
    });

    driverObj.drive();
  };

  return (
    <button
      id="tour-trigger"
      onClick={handleStartTour}
      className="flex items-center gap-2 px-4 py-2 border border-yellow-500/20 bg-yellow-50 text-yellow-700 hover:bg-yellow-500 hover:text-white rounded-xl text-xs font-bold transition-all duration-300 shadow-sm"
      title="Start Tour Guide"
    >
      <FaQuestionCircle className="text-sm animate-pulse" />
      <span>Quick Tour</span>
    </button>
  );
}
