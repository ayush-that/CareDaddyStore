import Link from "next/link";
import {
  X,
  Home,
  Info,
  FileText,
  HelpCircle,
  FileQuestion,
  Mail,
} from "lucide-react";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  if (!isOpen) return null;

  const menuItems = [
    { href: "/", icon: <Home className="w-5 h-5" />, label: "Home" },
    { href: "/about", icon: <Info className="w-5 h-5" />, label: "About us" },
    { href: "/faq", icon: <HelpCircle className="w-5 h-5" />, label: "FAQ" },
    {
      href: "/policy",
      icon: <FileQuestion className="w-5 h-5" />,
      label: "Policy",
    },
    {
      href: "/contact",
      icon: <Mail className="w-5 h-5" />,
      label: "Contact Us",
    },
  ];

  return (
    <div className="fixed inset-0 bg-[#f5f9fa] z-50">
      <div className="flex justify-end p-4">
        <button onClick={onClose} className="text-gray-600 hover:text-gray-900">
          <X className="w-6 h-6" />
        </button>
      </div>
      <div className="px-6">
        <h2 className="text-gray-900 font-medium mb-6">Navigation:</h2>
        <nav className="space-y-4">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-4 text-gray-700"
              onClick={onClose}
            >
              <span className="text-[#88bdbc]">{item.icon}</span>
              <span className="text-base">{item.label}</span>
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}
