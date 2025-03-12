import React from "react";

export const PaperIcon = ({ size, ...rest }) => {
  return (
    <svg
      {...rest}
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      width={`${size}px`}
      height={`${size}px`}
      viewBox="0 0 24 24"
    >
      <path d="m4.2778 23.976c-1.0216-0.15474-1.8818-0.83866-2.273-1.8072-0.24044-0.59526-0.22381 0.19362-0.22381-10.619v-9.8334l0.089805-0.24968c0.18403-0.51165 0.50072-0.90301 0.94731-1.1707 0.61376-0.36784 1.3898-0.39393 2.0358-0.068414 0.40968 0.20642 0.81369 0.62264 0.96955 0.99886l0.067569 0.16308 7.559 1.426e-4c7.4266 1.387e-4 7.5616 0.00146 7.7063 0.075263 0.18572 0.094747 0.33458 0.27003 0.38573 0.45421 0.02676 0.096366 0.03975 3.0435 0.03987 9.0564l2.3e-4 8.9136-0.09657 0.19379c-0.07455 0.1496-0.13924 0.21702-0.28368 0.29563l-0.18713 0.10184h-2.2751v1.4859c0 1.4357-0.0028 1.4916-0.08148 1.6542-0.04908 0.10139-0.14343 0.2093-0.23726 0.27141l-0.15578 0.1031-6.8977 5e-3c-3.7937 0.0028-6.9842-0.0081-7.0898-0.02407zm13.041-2.4393v-1.0563h-5.4749c-4.8606 0-5.4909-0.0067-5.6175-0.0596-0.07845-0.03277-0.25507-0.17721-0.39249-0.32095-0.28505-0.29818-0.39651-0.36449-0.78268-0.46564-0.52706-0.13805-1.0319 0.01361-1.4281 0.42899-0.29402 0.30824-0.3742 0.50298-0.39322 0.95497-0.01285 0.30559-0.00183 0.40083 0.067856 0.58586 0.16153 0.4289 0.52677 0.77834 0.95761 0.91618 0.20267 0.06484 0.57649 0.06883 6.6391 0.07078l6.4244 0.0021zm2.8425-10.602v-8.1241h-14.136v15.656l0.24008 0.15837c0.13204 0.0871 0.30921 0.21969 0.39372 0.29464l0.15365 0.13626 13.348 0.0032zm-12.157 5.9761c-0.17178-0.041977-0.26465-0.1007-0.39616-0.25048-0.28564-0.32532-0.16701-0.86036 0.23376-1.0544l0.16917-0.08189 10.249 0.02003 0.13889 0.09399c0.23297 0.15767 0.32216 0.32466 0.32136 0.60164-6.11e-4 0.21039-0.01534 0.25816-0.11931 0.38679-0.06524 0.08072-0.17728 0.18132-0.24898 0.22357-0.12844 0.07569-0.205 0.07692-5.1815 0.08285-2.7781 0.0033-5.103-0.0067-5.1664-0.02215zm-0.1333-2.868c-0.17555-0.07615-0.26265-0.15838-0.35094-0.33137-0.085321-0.16718-0.09387-0.40476-0.020825-0.57954 0.069685-0.16678 0.2971-0.36026 0.48194-0.41003 0.10319-0.02782 1.742-0.03738 5.1957-0.03042 4.9665 0.01 5.047 0.01138 5.1753 0.08698 0.0717 0.04225 0.18374 0.14286 0.24898 0.22357 0.10396 0.12862 0.1187 0.17639 0.11931 0.38677 8.8e-4 0.3026-0.12256 0.51176-0.3738 0.63338l-0.16833 0.08148-5.087-0.0015c-4.4427-0.0013-5.1039-0.0088-5.2203-0.05932zm-0.036812-2.8487c-0.51466-0.26332-0.51158-0.97921 0.005329-1.243 0.13774-0.070298 0.31424-0.072735 5.2645-0.072735h5.122l0.17484 0.11088c0.19786 0.12548 0.34007 0.37027 0.33871 0.58306-0.0012 0.19472-0.12482 0.43316-0.28967 0.5589l-0.14523 0.11078-5.1694 0.0098c-4.8636 0.0092-5.1772 0.0058-5.3011-0.05762zm0.036812-2.7978c-0.17611-0.076382-0.26267-0.15842-0.35213-0.33371-0.070071-0.13728-0.073366-0.22997-0.063136-1.773l0.010809-1.6282 0.11797-0.14757c0.24608-0.30783-0.24866-0.28353 5.5508-0.27258l5.1694 0.00979 0.14561 0.11107c0.08009 0.061087 0.17868 0.18582 0.2191 0.2772 0.06913 0.15628 0.07284 0.2603 0.06265 1.7548l-0.01085 1.5886-0.1031 0.15574c-0.062062 0.093766-0.17006 0.18815-0.2714 0.23721l-0.1683 0.081465-5.087-0.0015c-4.4427-0.0013202-5.1039-0.0088526-5.2203-0.059327zm9.4482-2.0712v-0.71079l-8.4698 0.01958-0.020938 1.402h8.4907zm-13.444 11.974c0.13732-0.04217 0.35783-0.08908 0.49001-0.10424l0.24033-0.02755-0.00986-8.1519-0.00986-8.1519-0.09257-0.13509c-0.32766-0.47817-0.99914-0.42351-1.2373 0.10072-0.067703 0.14905-0.070545 0.48599-0.071357 8.4623l-8.436e-4 8.3071 0.22087-0.11138c0.12147-0.06126 0.33322-0.14589 0.47054-0.18806z"/>
     </svg>
  );
};