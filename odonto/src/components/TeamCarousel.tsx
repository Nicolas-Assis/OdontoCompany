import { useState } from "react";
import { Modal, Carousel } from "antd";
import { UserOutlined } from "@ant-design/icons";
import dentist1 from "../assets/dentista1.jpg";
import dentist2 from "../assets/dentista2.jpg";
import dentist3 from "../assets/dentista3.jpg";
import dentist4 from "../assets/dentista4.jpg";
import dentist5 from "../assets/dentista5.jpg";

interface TeamMember {
  id: number;
  name: string;
  role: string;
  specialty: string;
  image: string;
}

const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: "Dr. Rafael Silva",
    role: "Cirurgião-Dentista",
    specialty: "Implantodontia e Prótese",
    image: dentist1,
  },
  {
    id: 2,
    name: "Dra. Mariana Costa",
    role: "Cirurgiã-Dentista",
    specialty: "Ortodontia",
    image: dentist2,
  },
  {
    id: 3,
    name: "Dr. Lucas Oliveira",
    role: "Cirurgião-Dentista",
    specialty: "Endodontia",
    image: dentist3,
  },
  {
    id: 4,
    name: "Dra. Juliana Santos",
    role: "Cirurgiã-Dentista",
    specialty: "Odontopediatria",
    image: dentist4,
  },
  {
    id: 5,
    name: "Dr. Pedro Almeida",
    role: "Cirurgião-Dentista",
    specialty: "Periodontia",
    image: dentist5,
  },
];

export function TeamCarousel() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div
        onClick={showModal}
        className="lp-media-tile hover:shadow-xl transition-shadow duration-300 cursor-pointer"
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            showModal();
          }
        }}
        aria-label="Ver equipe completa"
      >
        <div className="flex items-center justify-center h-[120px] sm:h-[110px] md:h-[120px] bg-gradient-to-br from-emerald-50 to-emerald-100">
          <UserOutlined className="text-5xl text-emerald-600" />
        </div>
        <div className="lp-media-caption">
          <span className="lp-media-caption-title font-bold text-xs sm:text-sm text-slate-800">
            Equipe preparada
          </span>
          <span className="lp-media-caption-text text-slate-600 text-xs leading-snug">
            Clique para conhecer nossos profissionais qualificados.
          </span>
        </div>
      </div>

      <Modal
        title={
          <div className="text-center text-xl font-bold text-slate-900">
            Nossa Equipe
          </div>
        }
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
        width={600}
        centered
        className="team-modal"
      >
        <Carousel autoplay autoplaySpeed={4000} dotPosition="bottom">
          {teamMembers.map((member) => (
            <div key={member.id}>
              <div className="flex flex-col items-center p-6">
                <div className="relative mb-4">
                  <img
                    src={member.image}
                    alt={`Foto de ${member.name}`}
                    className="w-48 h-48 rounded-full object-cover border-4 border-emerald-100 shadow-lg"
                  />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-1">
                  {member.name}
                </h3>
                <p className="text-sm text-emerald-600 font-semibold mb-1">
                  {member.role}
                </p>
                <p className="text-sm text-slate-600">{member.specialty}</p>
              </div>
            </div>
          ))}
        </Carousel>
      </Modal>
    </>
  );
}
